import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  setStepOne: () => void;
  handleDialog: () => void;
  isOpen?: boolean;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={props.isOpen}>
      <AlertDialogContent style={{ width: "80dvw", maxWidth: "500px" }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              props.handleDialog();
              props.setStepOne();
            }}
          >
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
