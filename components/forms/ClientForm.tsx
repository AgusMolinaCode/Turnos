"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/client.actions";
import { UserFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { User, Mail } from "lucide-react";

export const ClientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
        phone: values.phone,
        name: values.name,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/clientes/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Card className="max-w-[340px] mx-auto bg-white/90 dark:bg-black/50 backdrop-blur-md border border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl font-bold text-dark-800">
            Registrate y pedí tu turno
          </h2>
        </CardTitle> 
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center mx-auto space-y-4 w-full"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full name"
              placeholder="John Doe"
              icon={User}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              icon={Mail}
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="(555) 123-4567"
            />

            <SubmitButton className="mt-4 w-full" isLoading={isLoading}>
              Enviar
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
      
    </Card>
  );
};