import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: "pending" | "scheduled" | "canceled";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClasses = clsx(
    "px-2 py-1 rounded-full text-sm font-medium",
    {
      "bg-yellow-100 text-yellow-800": status === "pending",
      "bg-blue-100 text-blue-800": status === "scheduled",
      "bg-red-100 text-red-800": status === "canceled",
    }
  );

  return (
    <div className={statusClasses}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default StatusBadge;