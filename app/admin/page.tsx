import AdminCard from "@/components/AdminCard";
import { getTurnosRecientes } from "@/lib/actions/turno.actions";
import React from "react";
import { Calendar, Clock, XCircle } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { columns, Payment } from "@/components/table/Columns";



const Page = async () => {
  const turnos = await getTurnosRecientes();

  const scheduledCount = turnos.documents.filter((turno: { status: string; }) => turno.status === "scheduled").length;
  const pendingCount = turnos.documents.filter((turno: { status: string; }) => turno.status === "pending").length;
  const canceledCount = turnos.documents.filter((turno: { status: string; }) => turno.status === "cancelled").length;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4">
        <AdminCard
          type="turnos"
          count={scheduledCount}
          label="Turno programado"
          icon={Calendar}
        />

        <AdminCard
          type="pending"
          count={pendingCount}
          label="Turno pendiente"
          icon={Clock}
        />

        <AdminCard
          type="canceled"
          count={canceledCount}
          label="Turno cancelado"
          icon={XCircle}
        />
      </div>

      <DataTable data={turnos.documents} columns={columns} />
    </div>
  );
};

export default Page;
