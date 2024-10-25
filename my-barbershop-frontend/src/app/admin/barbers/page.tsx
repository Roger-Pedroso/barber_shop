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
import { ActivityLogIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Servico } from "../services/page";
import { Checkbox } from "@/components/ui/checkbox";

interface Schedule {
  id: number;
  label: string;
  checked: boolean;
  times: { label: string; checked: boolean }[];
}

export interface Barbeiro {
  id: number;
  name: string;
  barberShopId: number;
  imageUrl: string;
  role: string;
  email: string;
  fone: string;
  active: boolean;
  schedule: Schedule[];
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
  const getAvailableTimes = () => {
    const getHours = () => {
      const times = [];
      const start = 7; // Horário de início (8h)
      const end = 21; // Horário de término (18h)
      for (let i = start; i < end; i++) {
        times.push({ label: `${i}:00`, checked: Boolean(true) });
        times.push({ label: `${i}:30`, checked: Boolean(true) });
      }
      return times;
      // setAvailableTimes(times);
    };

    const getDays = [
      { id: 0, label: "segunda", checked: true, times: getHours() },
      { id: 1, label: "terca", checked: true, times: getHours() },
      { id: 2, label: "quarta", checked: true, times: getHours() },
      { id: 3, label: "quinta", checked: true, times: getHours() },
      { id: 4, label: "sexta", checked: true, times: getHours() },
      { id: 5, label: "sabado", checked: true, times: getHours() },
      { id: 6, label: "domingo", checked: false, times: getHours() },
    ];

    return getDays;
  };

  const [servicos, setServicos] = useState<Servico[]>([]);

  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [newBarber, setNewBarber] = useState<newBarber | null>(null);
  const [barberToUpdate, setBarberToUpdate] = useState<Barbeiro | null>(null);

  const days = getAvailableTimes();

  console.log("BARBERS", barbeiros);

  const fetchBarbeiros = async (): Promise<Barbeiro[]> => {
    const res = await fetch("http://localhost:3001/barbers");
    const data = await res.json();
    console.log("Barbeiros", data);

    const parsedData = data.map((barbeiro: Barbeiro) => {
      if (barbeiro.schedule.length === 0) {
        return {
          ...barbeiro,
          schedule: days,
        };
      }

      return barbeiro;
    });

    setBarbeiros(parsedData);
    console.log("XXX", parsedData);
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
      schedule: barbeiro.schedule.length === 0 ? days : barbeiro.schedule,
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

  const handleSaveSchedule = async (id: number, schedule: Schedule[]) => {
    const barberScheduleData = {
      schedule,
    };

    console.log("barberScheduleData", barberScheduleData, id);
    // return;
    try {
      const res = await fetch(`http://localhost:3001/barbers/${id}/schedule`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(barberScheduleData),
      });

      if (res.status === 200) {
        setBarberToUpdate(null);
        await fetchBarbeiros();
        parseBarbeiros();
      }
    } catch (error) {
      console.log("Erro ao salva agenda do barbeiro", error);
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
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          console.log("barbeiro", barbeiro);

                          setBarberToUpdate(barbeiro);
                        }}
                      >
                        <ActivityLogIcon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent style={{ maxWidth: "60%" }}>
                      <DialogHeader>
                        <DialogTitle>Agenda</DialogTitle>
                        <DialogDescription>
                          <div>
                            <p>sad</p>
                            <div className="flex gap-3">
                              {barberToUpdate?.schedule.map((day) => {
                                return (
                                  <div key={day.label}>
                                    <div
                                      key={day.label + day.checked}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={day.label}
                                        checked={day.checked}
                                        onCheckedChange={(checked) => {
                                          console.log("SAD", checked);

                                          setBarberToUpdate({
                                            ...barberToUpdate,
                                            schedule:
                                              barberToUpdate.schedule.map(
                                                (d) => {
                                                  if (d.id === day.id) {
                                                    return {
                                                      ...d,
                                                      checked: Boolean(checked),
                                                    };
                                                  }
                                                  return d;
                                                }
                                              ),
                                          });
                                        }}
                                      />
                                      <label
                                        htmlFor={day.label}
                                        className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {day.label}
                                      </label>
                                    </div>
                                    <div className="flex flex-col gap-2 pt-4">
                                      {day.times.map((t) => {
                                        return (
                                          <div
                                            key={t.label + t.checked}
                                            className="flex items-center space-x-2"
                                          >
                                            <Checkbox
                                              id={t.label}
                                              checked={t.checked}
                                              onCheckedChange={(checked) => {
                                                console.log("checked", checked);

                                                setBarberToUpdate((prev) =>
                                                  prev
                                                    ? {
                                                        ...prev,
                                                        schedule:
                                                          barberToUpdate.schedule.map(
                                                            (d) => {
                                                              if (
                                                                d.id === day.id
                                                              ) {
                                                                return {
                                                                  ...d,
                                                                  times:
                                                                    d.times.map(
                                                                      (ts) => {
                                                                        if (
                                                                          ts.label ===
                                                                          t.label
                                                                        ) {
                                                                          return {
                                                                            ...ts,
                                                                            checked:
                                                                              Boolean(
                                                                                checked
                                                                              ),
                                                                          };
                                                                        }
                                                                        return ts;
                                                                      }
                                                                    ),
                                                                };
                                                              }
                                                              return d;
                                                            }
                                                          ),
                                                      }
                                                    : null
                                                );
                                              }}
                                            />
                                            <label
                                              htmlFor={t.label}
                                              className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                              {t.label}
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
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
                                  onClick={() => {}}
                                >
                                  Cancelar
                                </Button>
                              </DialogTrigger>
                            </div>
                            <div>
                              <DialogTrigger>
                                <Button
                                  onClick={() =>
                                    handleSaveSchedule(
                                      barbeiro.id,
                                      barberToUpdate?.schedule
                                    )
                                  }
                                >
                                  Salvar Agenda
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
