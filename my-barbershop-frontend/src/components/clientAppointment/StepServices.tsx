import React from "react";

import { Service } from "@/app/admin/services/page";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface StepServicosProps {
  services: Service[];
  selectedServices: Service[];
  onSelectService: (service: Service[]) => void;
  onNextStep: () => void;
  onBackStep: () => void;
}

export const StepServices: React.FC<StepServicosProps> = ({
  services,
  selectedServices,
  onSelectService,
  onNextStep,
  onBackStep,
}) => {
  return (
    <Card
      style={{
        width: "90vw",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "8px",
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        padding: "15px",
      }}
    >
      <div>
        <h2 className="text-center text-2xl pb-4">Selecione os Serviços</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                display: "flex",
                alignSelf: "start",
                fontSize: "20px",
              }}
            >
              <label>
                <input
                  style={{ width: "18px", height: "18px" }}
                  type="checkbox"
                  value={service.id}
                  onChange={(e) => {
                    const newSelectedServices = e.target.checked
                      ? [...selectedServices, service]
                      : selectedServices.filter((s) => s.id !== service.id);
                    onSelectService(newSelectedServices);
                  }}
                />
                {service.name} - R$&nbsp;{service.price} &nbsp;(
                {service.duration}
                min)
              </label>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              alignSelf: "end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <div>
              <Button variant={"secondary"} onClick={onBackStep}>
                Voltar
              </Button>
            </div>
            <div>
              <Button
                onClick={onNextStep}
                disabled={selectedServices.length === 0}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
