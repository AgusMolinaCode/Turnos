import React from "react";
import { LucideIcon } from "lucide-react";

interface AdminCardProps {
  count: number;
  type: "turnos" | "pending" | "canceled";
  icon: LucideIcon;
  label: string;
}

const AdminCard = ({ count = 0, label, icon: Icon, type }: AdminCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Icon className="h-12 w-12 text-gray-500" />
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900">{count}</div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default AdminCard;