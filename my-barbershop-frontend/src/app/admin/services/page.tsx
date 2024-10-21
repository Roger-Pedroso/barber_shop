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
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export interface Servico {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  active: boolean;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [serviceToUpdate, setServiceToUpdate] = useState<Servico | null>(null);

  useEffect(() => {
    async function fetchServicos() {
      const res = await fetch("http://localhost:3001/barber-service");
      const data = await res.json();
      console.log("data", data);

      setServicos(data);
    }
    fetchServicos();
  }, []);

  const updateServiceField = (field: keyof Servico, value: string) => {
    setServiceToUpdate((prevService) =>
      prevService ? { ...prevService, [field]: value } : null
    );
  };

  const handleUpdate = async (id: number) => {
    console.log(id);
  };

  console.log("SADASDASd", serviceToUpdate);

  return (
    <div className="p-5">
      <h1 className="text-3xl text-black font-bold">Serviços</h1>
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
                              <Button
                                onClick={() => {}}
                                // disabled={selectedServicos.length === 0}
                              >
                                Continuar
                              </Button>
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
        {/* <DialogTrigger>Open</DialogTrigger> */}
      </div>

      <div></div>
    </div>
  );
}
