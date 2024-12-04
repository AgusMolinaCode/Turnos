"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import React from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  SELECT = "select",
  CHECKBOX = "checkbox",
  DATE_PICKER = "date-picker",
  SKELETON = "skeleton",
  PHONE_INPUT = "phone-input",
}

const ClientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData);

      // if (user) router.push(`/users/${user.$id}/register`);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  }

  return (
    <div className="max-w-lg flex justify-center mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold">Sign up</h2>
            <p className="text-gray-500">Pide tu primer turno.</p>
          </section>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nombre completo"
            placeholder="Juan Perez"
            iconSrc="/icons/user.svg"
            iconAlt="User icon"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="juanperez@gmail.com"
            iconSrc="/icons/email.svg"
            iconAlt="Email icon"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Teléfono"
            placeholder="11 38981568"
            iconSrc="/icons/phone.svg"
            iconAlt="Phone icon"
          />
          <SubmitButton className="w-full" isLoading={isLoading}>
            Sign up
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default ClientForm;
