import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/client.actions";
import React from "react";

const page = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div>
      <h1>Registro</h1>
      <p className="text-xl">Bienvenido {user.name}</p>
      <RegisterForm user={user} />
    </div>
  );
};

export default page;
