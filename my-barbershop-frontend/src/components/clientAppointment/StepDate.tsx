import { Barber, Schedule } from "@/app/admin/barbers/page";
import { Card } from "../ui/card";
import { Appointment, AppointmentStatus } from "@/app/admin/appointments/page";
import { Button } from "../ui/button";
import { compareDates } from "@/utils/timeUtils";
import { Label } from "@radix-ui/react-label";

interface StepDateProps {
  schedules: Schedule[];
  appointments: Appointment[];
  barberId: number | undefined;
  selectedBarber: Barber | null;
  setSelectedBarber: (selectedBarber: Barber | null) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  availableTimes: string[];
  setAvailableTimes: (availableTimes: string[]) => void;
  selectedTime: string | null;
  onSelectTime: (selectedTime: string | null) => void;
  onNextStep: () => void;
  onBackStep: () => void;
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

  function generateAvailableTimes(
    schedules: Schedule[],
    appointments: Appointment[],
    barberId: number
  ): { date: Date; availableTimes: string[]; dayWeek: string }[] {
    const availableTimes: {
      date: Date;
      availableTimes: string[];
      dayWeek: string;
    }[] = [];
    const now = new Date();

    // Iterar pelos próximos 15 dias
    for (let i = 0; i < 15; i++) {
      const currentDate = new Date(now);
      currentDate.setDate(now.getDate() + i);

      // Encontrar o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
      const dayOfWeek = currentDate.getDay();

      // Encontrar a agenda do barbeiro para o dia atual
      const scheduleForDay = schedules.find(
        (schedule) => schedule.id === dayOfWeek
      );
      if (!scheduleForDay || !scheduleForDay.checked) continue;

      // Filtrar horários ocupados para o dia atual e o barbeiro específico
      const appointmentsForDay = appointments.filter((appointment) => {
        return (
          appointment.barberId === barberId &&
          appointment.status === AppointmentStatus.Agendado &&
          new Date(appointment.appointmentDate).toDateString() ===
            currentDate.toDateString()
        );
      });

      // Criar uma lista de horários disponíveis
      const dayAvailableTimes = scheduleForDay.times
        .filter((time) => time.checked)
        .filter((time) => {
          // Verificar se o horário já está ocupado
          const timeLabel = time.label;
          return !appointmentsForDay.some((appointment) => {
            const appointmentTime = new Date(appointment.appointmentDate)
              .toTimeString()
              .slice(0, 5);
            return appointmentTime === timeLabel;
          });
        })
        .map((time) => time.label);

      // Adicionar horários disponíveis para o dia atual, se houver
      if (dayAvailableTimes.length > 0) {
        availableTimes.push({
          date: currentDate,
          dayWeek: diasDaSemana[currentDate.getDay()],
          availableTimes: dayAvailableTimes,
        });
      }
    }

    return availableTimes;
  }

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
            {generateAvailableTimes(
              props.selectedBarber?.schedule ?? [],
              props.appointments,
              props.selectedBarber?.id ?? 0
            ).map((time1) => (
              <div key={time1.dayWeek}>
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
                    props.setAvailableTimes(time1.availableTimes);
                  }}
                >
                  <Label>
                    {time1.date.toLocaleDateString()}
                    <br />({time1.dayWeek})
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
