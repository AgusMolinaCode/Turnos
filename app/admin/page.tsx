import AdminCard from "@/components/AdminCard";
import { getTurnosRecientes } from "@/lib/actions/turno.actions";
import React from "react";
import { Calendar, Clock, XCircle } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { columns, Payment } from "@/components/table/Columns";



const Page = async () => {
  const turnos = await getTurnosRecientes();
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4">
        <AdminCard
          type="turnos"
          count={turnos.scheduled}
          label="Turno programado"
          icon={Calendar} // This is a Lucide icon
        />

        <AdminCard
          type="pending"
          count={turnos.pending}
          label="Turno pendiente"
          icon={Clock} // This is a Lucide icon
        />

        <AdminCard
          type="canceled"
          count={turnos.canceled}
          label="Turno cancelado"
          icon={XCircle} // This is a Lucide icon
        />
      </div>

      <DataTable data={turnos.documents} columns={columns} />
      
    </div>
  );
};

export default Page;
