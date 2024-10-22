"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Servico } from "../services/page";

export interface Barbeiro {
  id: number;
  name: string;
  barberShopId: number;
  imageUrl: string;
  role: string;
  email: string;
  fone: string;
  active: boolean;
  services: Servico[];
}

export interface newBarber {
  name: string;
  fone: string;
  email: string;
  services: number[];
  imageUrl: string;
  barberShopId: number;
}

export default function Barbeiros() {
  const [servicos, setServicos] = useState<Servico[]>([]);

  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [newBarber, setNewBarber] = useState<newBarber | null>(null);
  const [barberToUpdate, setBarberToUpdate] = useState<Barbeiro | null>(null);

  const fetchBarbeiros = async (): Promise<Barbeiro[]> => {
    const res = await fetch("http://localhost:3001/barbers");
    const data = await res.json();

    setBarbeiros(data);
    return data;
  };

  const fetchServicos = async () => {
    const res = await fetch("http://localhost:3001/barber-service");
    const data = await res.json();

    setServicos(data);
  };

  const parseBarbeiros = async () => {
    const barbersData = await fetchBarbeiros();

    const barbeirosParsed = barbersData.map((barbeiro) => ({
      ...barbeiro,
      services: servicos.map((servico) => ({
        ...servico,
        checked: barbeiro.services.some(
          (servicoParsed) => servicoParsed.id === servico.id
        )
          ? true
          : false,
      })),
    }));

    setBarbeiros(barbeirosParsed);
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  useEffect(() => {
    parseBarbeiros();
  }, [servicos]);

  const updateBarberField = (
    field: keyof Barbeiro,
    value: string | boolean
  ) => {
    setBarberToUpdate((prevService) =>
      prevService ? { ...prevService, [field]: value } : null
    );
  };

  const updateNewBarberField = (
    field: keyof Barbeiro,
    value: string | boolean
  ) => {
    setNewBarber((prevService) =>
      prevService ? { ...prevService, [field]: value } : null
    );
  };

  const handleUpdate = async (id: number) => {
    const dataToUpdate = {
      active: barberToUpdate?.active,
      name: barberToUpdate?.name,
      email: barberToUpdate?.email,
      fone: barberToUpdate?.fone,
      services: barberToUpdate?.services
        .filter((servico) => servico.checked)
        .map((servico) => servico.id),
      // imageUrl: barberToUpdate?.imageUrl,
    };

    try {
      const res = await fetch(`http://localhost:3001/barbers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (res.status === 200) {
        setBarberToUpdate(null);
        await fetchBarbeiros();
        parseBarbeiros();
      }
    } catch (error) {
      console.log("Erro ao atualizar barbeiro", error);
    }
  };

  const handleCreate = async () => {
    const newBarberData = {
      name: newBarber?.name,
      email: newBarber?.email,
      fone: newBarber?.fone,
      services: newBarber?.services,
      imageUrl: "https://yex-web-s3.s3.sa-east-1.amazonaws.com/no-image.png",
      barberShopId: 1, //TO DO PEGAR DO USUARIO LOGADO
    };
    console.log("newBarberData", newBarberData);

    try {
      const res = await fetch("http://localhost:3001/barbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBarberData),
      });

      if (res.status === 201) {
        setNewBarber(null);
        fetchBarbeiros();
      }
    } catch (error) {
      console.log("Erro ao criar barbeiro", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between pb-3">
        <h1 className="text-3xl text-black font-bold">Barbeiros</h1>
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"outline"}
              onClick={() =>
                setNewBarber({
                  name: "",
                  fone: "",
                  email: "",
                  imageUrl: "",
                  services: [],
                  barberShopId: 1,
                })
              }
            >
              Cadastrar Barbeiro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Barbeiro</DialogTitle>
              <DialogDescription>
                <div>
                  <Label htmlFor="new-barber-name">Nome</Label>
                  <Input
                    id="new-barber-name"
                    type="text"
                    value={newBarber?.name}
                    onChange={(e) =>
                      updateNewBarberField("name", e.target.value)
                    }
                  />
                  <Label htmlFor="new-barber-email">Email</Label>
                  <Input
                    id="new-barber-email"
                    type="email"
                    value={newBarber?.email}
                    onChange={(e) =>
                      updateNewBarberField("email", e.target.value)
                    }
                  />
                  <Label htmlFor="new-barber-fone">Telefone</Label>
                  <Input
                    id="new-barber-fone"
                    type="text"
                    value={newBarber?.fone}
                    onChange={(e) =>
                      updateNewBarberField("fone", e.target.value)
                    }
                  />
                  <div className="flex flex-col pt-3">
                    {servicos.map((servico) => (
                      <div key={servico.id}>
                        <input
                          type="checkbox"
                          id={servico.name}
                          name={servico.name}
                          value={servico.name}
                          onChange={() => newBarber?.services.push(servico.id)}
                        />
                        <label htmlFor={servico.name}>
                          {servico.name} - R$ {servico.price} -{" "}
                          {servico.duration}(min)
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignSelf: "end",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <DialogTrigger>
                      <Button
                        variant={"secondary"}
                        onClick={() => setNewBarber(null)}
                      >
                        Cancelar
                      </Button>
                    </DialogTrigger>
                  </div>
                  <div>
                    <DialogTrigger>
                      <Button
                        onClick={() => {
                          handleCreate();
                        }}
                      >
                        Continuar
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div style={{ backgroundColor: "black" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barbeiros?.map((barbeiro) => (
              <TableRow key={barbeiro.id}>
                <TableCell>{barbeiro.id}</TableCell>
                <TableCell>{barbeiro.name}</TableCell>
                <TableCell>{barbeiro.email}</TableCell>
                <TableCell>{barbeiro.fone}</TableCell>
                <TableCell>{barbeiro.role}</TableCell>
                <TableCell>{barbeiro.active ? "Ativo" : "Inativo"}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          console.log("barbeiro", barbeiro);

                          setBarberToUpdate(barbeiro);
                        }}
                      >
                        <Pencil2Icon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Barbeiro</DialogTitle>
                        <DialogDescription>
                          <div>
                            <Label htmlFor="barber-name">Nome</Label>
                            <Input
                              id="barber-name"
                              type="text"
                              value={barberToUpdate?.name}
                              onChange={(e) =>
                                updateBarberField("name", e.target.value)
                              }
                            />
                            <Label htmlFor="barber-email">Email</Label>
                            <Input
                              id="barber-email"
                              type="text"
                              value={barberToUpdate?.email}
                              onChange={(e) =>
                                updateBarberField("email", e.target.value)
                              }
                            />
                            <Label htmlFor="barber-fone">Telefone</Label>
                            <Input
                              id="barber-fone"
                              type="text"
                              value={barberToUpdate?.fone}
                              onChange={(e) =>
                                updateBarberField("fone", e.target.value)
                              }
                            />
                            <div className="flex flex-col">
                              <Label htmlFor="barber-status">Status</Label>
                              <Switch
                                id="barber-status"
                                checked={barberToUpdate?.active}
                                onCheckedChange={(checked) =>
                                  updateBarberField("active", checked)
                                }
                              />
                            </div>
                            <div className="flex flex-col pt-3">
                              {barberToUpdate?.services?.map((servico) => (
                                <div key={servico.id}>
                                  <input
                                    type="checkbox"
                                    id={servico.name}
                                    name={servico.name}
                                    value={servico.name}
                                    checked={servico.checked}
                                    onChange={(e) =>
                                      setBarberToUpdate({
                                        ...barberToUpdate,
                                        services: barberToUpdate?.services?.map(
                                          (btpServico) => {
                                            if (btpServico.id === servico.id) {
                                              return {
                                                ...btpServico,
                                                checked: e.target.checked,
                                              };
                                            }
                                            return btpServico;
                                          }
                                        ),
                                      })
                                    }
                                  />
                                  <label htmlFor={servico.name}>
                                    {servico.name} - R$ {servico.price} -{" "}
                                    {servico.duration}(min)
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignSelf: "end",
                              gap: "10px",
                              marginTop: "20px",
                            }}
                          >
                            <div>
                              <DialogTrigger>
                                <Button
                                  variant={"secondary"}
                                  onClick={() => setBarberToUpdate(null)}
                                >
                                  Cancelar
                                </Button>
                              </DialogTrigger>
                            </div>
                            <div>
                              <DialogTrigger>
                                <Button
                                  onClick={() => {
                                    handleUpdate(barbeiro.id);
                                  }}
                                >
                                  Continuar
                                </Button>
                              </DialogTrigger>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
