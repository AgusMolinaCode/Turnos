import React from "react";
import { TurnoForm } from "@/components/forms/TurnoForm";
import { getClient } from "@/lib/actions/client.actions";

interface SearchParamProps {
  params: {
    userId: string; // Adjust type according to your actual data
  };
}

const page = async ({ params: { userId } }: SearchParamProps) => {
  const cliente = await getClient(userId);
  
  if (!cliente) {
    return <div>Cliente no encontrado</div>;
  }


  return (
    <div className="px-2 py-10">
      <TurnoForm type="create" userId={userId} clienteId={cliente?.$id} />
    </div>
  );
};

export default page;
