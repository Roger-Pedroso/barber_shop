import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface StepConfirmationProps {
  selectedDate: Date | null;
  selectedHour: string | null;
  clientName: string;
  setClientName: (clientName: string) => void;
  clientFone: string;
  setClientFone: (clientFone: string) => void;
  onNextStep: () => void;
  onBackStep: () => void;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = (props) => {
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
        <h2 className="text-center text-2xl pb-4">Confirme o Agendamento</h2>
        <p className="text-center pb-4">
          Confirmação do agendamento para a data:{" "}
          {props.selectedDate?.toLocaleDateString("pt-BR")} as{" "}
          {props.selectedHour}
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="flex self-start w-full">
            <Input
              type="text"
              value={props.clientName}
              onChange={(e) => props.setClientName(e.target.value)}
              placeholder="Nome"
            />
          </div>
          <div className="flex self-start w-full">
            <Input
              type="text"
              value={props.clientFone}
              onChange={(e) => props.setClientFone(e.target.value)}
              placeholder="Telefone"
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
              <Button variant={"secondary"} onClick={props.onBackStep}>
                Voltar
              </Button>
            </div>
            <div>
              <Button
                onClick={props.onNextStep}
                disabled={!props.clientName || !props.clientFone}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
