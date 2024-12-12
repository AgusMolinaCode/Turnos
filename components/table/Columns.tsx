"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import TurnoModal from "./TurnoModal";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "scheduled" | "canceled";
  email: string;
  schedule: string;
  cliente: {
    name: string;
    id: string;
  };
  primaryProfessional: string;
  userId: string;
  description: string;
  cancelationReason: string | null;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => {
      return <p className="text-md">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => {
      const turno = row.original;
      return <p className="text-md">{row.original.cliente.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const formattedDate = format(
        new Date(row.original.schedule),
        "EEEE d 'de' MMMM yyyy, hh:mm a",
        { locale: es }
      );
      return <p className="text-md">{formattedDate}</p>;
    },
  },
  {
    accessorKey: "primaryProfessional",
    header: "Profesional",
    cell: ({ row }) => {
      const turno = row.original;
      return <p className="text-md">{turno.primaryProfessional}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row: { original: turno } }) => {
      return (
        <div className="flex items-center justify-end">
          <div className="flex gap-2">
            <TurnoModal
              type="scheduled"
              clienteId={turno.cliente.id}
              userId={turno.userId}
              turno={turno as unknown as Turno}
            />
            <TurnoModal
              type="canceled"
              clienteId={turno.cliente.id}
              userId={turno.userId}
              turno={turno as unknown as Turno}
            />
          </div>
        </div>
      );
    },
  },
];

// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button variant="ghost" className="h-8 w-8 p-0">
//       <span className="sr-only">Open menu</span>
//       <MoreHorizontal className="h-4 w-4" />
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align="end">
//     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//     <DropdownMenuItem
//       onClick={() => navigator.clipboard.writeText(payment.id)}
//     >
//       Copy payment ID
//     </DropdownMenuItem>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>View customer</DropdownMenuItem>
//     <DropdownMenuItem>View payment details</DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
