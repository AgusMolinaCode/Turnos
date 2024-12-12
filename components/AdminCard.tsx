import React from "react";
import { LucideIcon } from "lucide-react";

interface AdminCardProps {
  type: "turnos" | "pending" | "canceled";
  count: number;
  label: string;
  icon: LucideIcon;
}

const AdminCard = ({ type, count, label, icon: Icon }: AdminCardProps) => {
  return (
    <div className={`
      p-4 rounded-xl flex items-center justify-between 
      ${type === "turnos" && "bg-primary/10 text-primary"}
      ${type === "pending" && "bg-yellow-500/10 text-yellow-500"}
      ${type === "canceled" && "bg-destructive/10 text-destructive"}
    `}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{count}</h2>
        <p className="text-xs">{label}</p>
      </div>
      <Icon className="w-8 h-8 opacity-50" />
    </div>
  );
};

export default AdminCard;