"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TurnoForm } from "../forms/TurnoForm";

interface TurnoModalProps {
  type: "scheduled" | "canceled";
  clienteId: string;
  userId: string;
  turno?: Turno;
}

const TurnoModal = ({ type, clienteId, userId, turno }: TurnoModalProps) => {
  const [open, setOpen] = useState(false);
  const buttonVariant = type === "scheduled" ? "default" : "destructive";
  const buttonText = type === "scheduled" ? "Confirmar" : "Cancelar";

  // Convertir el tipo "scheduled"/"cancelled" a "schedule"/"cancel"
  const formType: TurnoType = type === "scheduled" ? "schedule" : "cancel";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size="sm" className="mx-1">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "scheduled" ? "Confirmar Turno" : "Cancelar Turno"}
          </DialogTitle>
          <DialogDescription>
            {type === "scheduled"
              ? "Esta acción confirmará el turno seleccionado."
              : "Esta acción cancelará el turno seleccionado. Esta acción no se puede deshacer."}
          </DialogDescription>
        </DialogHeader>

        <TurnoForm
          userId={userId}
          clienteId={clienteId}
          type={formType}
          turno={turno}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TurnoModal;
