import { Barber, Schedule } from "@/app/admin/barbers/page";
import { Card } from "../ui/card";
import { Appointment } from "@/app/admin/appointments/page";
import { Button } from "../ui/button";
import { compareDates } from "@/utils/timeUtils";
import { Label } from "@radix-ui/react-label";
import { Service } from "@/app/admin/services/page";

interface StepDateProps {
  schedules: Schedule[];
  appointments: Appointment[];
  barberId: number | undefined;
  selectedBarber: Barber | null;
  setSelectedBarber: (selectedBarber: Barber | null) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  availableTimes: string[];
  selectedTime: string | null;
  onSelectTime: (selectedTime: string | null) => void;
  onNextStep: () => void;
  onBackStep: () => void;
  selectedServices: Service[];
}

export const StepDate: React.FC<StepDateProps> = (props) => {
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const getNext14Days = () => {
    const today = new Date();

    return Array.from({ length: 14 }, (_, i) => {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + i);

      return {
        date: futureDate,
        dayOfWeek: diasDaSemana[futureDate.getDay()],
      };
    });
  };

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
        <h2 className="text-center text-2xl pb-4">Selecione a Data</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="grid grid-cols-3 gap-2">
            {getNext14Days().map((time1) => (
              <div key={time1.dayOfWeek}>
                <Button
                  key={time1.toString()}
                  style={{
                    width: "100%",
                    backgroundColor: compareDates(
                      time1.date,
                      props.selectedDate
                    )
                      ? "white"
                      : "gray",
                  }}
                  onClick={() => {
                    props.onSelectTime(null);
                    props.onSelectDate(time1.date);
                  }}
                >
                  <Label>
                    {time1.date.toLocaleDateString()}
                    <br />({time1.dayOfWeek})
                  </Label>
                </Button>
              </div>
            ))}
          </div>
          <h2 className="text-center text-2xl pb-4">Horários Disponíveis</h2>

          <div className="grid grid-cols-5 gap-1">
            {props.availableTimes.map((time2) => (
              <Button
                key={time2}
                style={{
                  backgroundColor:
                    time2 === props.selectedTime ? "white" : "gray",
                }}
                onClick={() => props.onSelectTime(time2)}
              >
                {props.selectedTime === time2 ? <b>{time2}</b> : time2}
              </Button>
            ))}
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
              <Button variant={"secondary"} onClick={props.onBackStep}>
                Voltar
              </Button>
            </div>
            <div>
              <Button
                onClick={props.onNextStep}
                disabled={props.selectedTime === null}
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
