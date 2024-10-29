import { Barber } from "@/app/admin/barbers/page";
import { Card } from "../ui/card";
import Image from "next/image";

interface StepAttendantProps {
  barbers: Barber[];
  onNextStep: () => void;
  onSelectAttendant: (barber: Barber) => void;
}

export const StepAttendant: React.FC<StepAttendantProps> = ({
  barbers,
  onNextStep,
  onSelectAttendant,
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
        textAlign: "center",
      }}
    >
      <div>
        <h2 className="text-center text-2xl pb-4">Selecione um Atendente</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {barbers.map((barber) => (
            <div
              key={barber.id}
              onClick={() => {
                onSelectAttendant(barber);
                onNextStep();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {barber.imageUrl && (
                <Image
                  src={barber.imageUrl}
                  alt={barber.name}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "20%",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    minHeight: "100px",
                    minWidth: "100px",
                  }}
                />
              )}
              <h3>{barber.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
