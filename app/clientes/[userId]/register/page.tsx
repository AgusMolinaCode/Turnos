import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/client.actions";
import React from "react";

const page = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="px-2 py-10">
      <RegisterForm user={user} />
    </div>
  );
};

export default page;
