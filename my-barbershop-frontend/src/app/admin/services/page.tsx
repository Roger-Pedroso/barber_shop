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

export interface Servico {
  id: number;
  name: string;
  price: string;
  duration: string;
  active: boolean;
}

export interface newService {
  name: string;
  price: string;
  duration: string;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [newService, setNewService] = useState<newService | null>(null);
  const [serviceToUpdate, setServiceToUpdate] = useState<Servico | null>(null);

  const fetchServicos = async () => {
    const res = await fetch("http://localhost:3001/barber-service");
    const data = await res.json();

    setServicos(data);
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const updateServiceField = (
    field: keyof Servico,
    value: string | boolean
  ) => {
    setServiceToUpdate((prevService) =>
      prevService ? { ...prevService, [field]: value } : null
    );
  };

  const updateNewServiceField = (
    field: keyof Servico,
    value: string | boolean
  ) => {
    setNewService((prevService) =>
      prevService ? { ...prevService, [field]: value } : null
    );
  };

  const handleUpdate = async (id: number) => {
    const dataToUpdate = {
      active: serviceToUpdate?.active,
      duration: Number(serviceToUpdate?.duration),
      price: Number(serviceToUpdate?.price),
      name: serviceToUpdate?.name,
    };
    try {
      const res = await fetch(`http://localhost:3001/barber-service/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (res.status === 200) {
        setServiceToUpdate(null);
        fetchServicos();
      }
    } catch (error) {
      console.log("Erro ao atulaizar serviço", error);
    }
  };

  const handleCreate = async () => {
    const newServiceData = {
      name: newService?.name,
      price: Number(newService?.price),
      duration: Number(newService?.duration),
      barberShopId: 1, //TO DO PEGAR DO USUARIO LOGADO
    };

    try {
      const res = await fetch("http://localhost:3001/barber-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newServiceData),
      });

      if (res.status === 201) {
        setNewService(null);
        fetchServicos();
      }
    } catch (error) {
      console.log("Erro ao criar serviço", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between pb-3">
        <h1 className="text-3xl text-black font-bold">Serviços</h1>
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"outline"}
              onClick={() =>
                setNewService({ name: "", price: "", duration: "" })
              }
            >
              Cadastrar Serviço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Serviço</DialogTitle>
              <DialogDescription>
                <div>
                  <Label htmlFor="new-service-name">Descrição</Label>
                  <Input
                    id="new-service-name"
                    type="text"
                    value={newService?.name}
                    onChange={(e) =>
                      updateNewServiceField("name", e.target.value)
                    }
                  />
                  <Label htmlFor="new-service-price">Preço</Label>
                  <Input
                    id="new-service-price"
                    type="number"
                    value={newService?.price}
                    onChange={(e) =>
                      updateNewServiceField("price", e.target.value)
                    }
                  />
                  <Label htmlFor="new-service-duration">Duração</Label>
                  <Input
                    id="new-service-duration"
                    type="number"
                    value={newService?.duration}
                    onChange={(e) =>
                      updateNewServiceField("duration", e.target.value)
                    }
                  />
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
                        onClick={() => setNewService(null)}
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
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Duração(min)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicos?.map((servico) => (
              <TableRow key={servico.id}>
                <TableCell>{servico.id}</TableCell>
                <TableCell>{servico.name}</TableCell>
                <TableCell>{servico.price}</TableCell>
                <TableCell>{servico.duration}</TableCell>
                <TableCell>{servico.active ? "Ativo" : "Inativo"}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={"outline"}
                        onClick={() => setServiceToUpdate(servico)}
                      >
                        <Pencil2Icon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Serviço</DialogTitle>
                        <DialogDescription>
                          <div>
                            <Label htmlFor="service-name">Descrição</Label>
                            <Input
                              id="service-name"
                              type="text"
                              value={serviceToUpdate?.name}
                              onChange={(e) =>
                                updateServiceField("name", e.target.value)
                              }
                            />
                            <Label htmlFor="service-price">Preço</Label>
                            <Input
                              id="service-price"
                              type="text"
                              value={serviceToUpdate?.price}
                              onChange={(e) =>
                                updateServiceField("price", e.target.value)
                              }
                            />
                            <Label htmlFor="service-duration">Duração</Label>
                            <Input
                              id="service-duration"
                              type="text"
                              value={serviceToUpdate?.duration}
                              onChange={(e) =>
                                updateServiceField("duration", e.target.value)
                              }
                            />
                            <div className="flex flex-col">
                              <Label htmlFor="service-status">Status</Label>
                              <Switch
                                id="service-status"
                                checked={serviceToUpdate?.active}
                                onCheckedChange={(checked) =>
                                  updateServiceField("active", checked)
                                }
                              />
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
                                  onClick={() => setServiceToUpdate(null)}
                                >
                                  Cancelar
                                </Button>
                              </DialogTrigger>
                            </div>
                            <div>
                              <DialogTrigger>
                                <Button
                                  onClick={() => {
                                    handleUpdate(servico.id);
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
