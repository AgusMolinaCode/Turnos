"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { createUser, registerUser } from "@/lib/actions/client.actions";
import { ClientFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { Abogados } from "@/constants";
import { FileUploader } from "../FileUploader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Mail, ClipboardList, Calendar, KeySquare } from "lucide-react";

export const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ClientFormValidation>>({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: new Date(),
      primaryProfessional: "",
      documentoDni: "",
      documentoUrlPhoto: [],
      privacyConsent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof ClientFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (values.documentoUrlPhoto && values.documentoUrlPhoto?.length > 0) {
      const blobFile = new Blob([values.documentoUrlPhoto[0]], {
        type: values.documentoUrlPhoto[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.documentoUrlPhoto[0].name);
    }

    try {
      const clientData = {
        email: values.email,
        phone: values.phone,
        name: values.name,
        birthDate: new Date(values.birthDate),
        primaryProfessional: values.primaryProfessional,
        documentoDni: values.documentoDni,
        documentoUrlPhoto: formData,
        privacyConsent: values.privacyConsent,
        userId: user.$id,
      };

      const newClient = await registerUser(clientData);

      if (newClient) {
        router.push(`/clientes/${newClient.$id}/nuevo-turno`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Card className="max-w-[640px] mx-auto bg-white/90 dark:bg-black/50 backdrop-blur-md border border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl flex items-center gap-2 font-bold text-dark-800">
            <ClipboardList /> {user.name}
          </h2>
          <p className="text-gray-500 font-normal mt-3">
            Completa todos los datos para registrar tu turno
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Full name"
                placeholder="John Doe"
                icon={User}
                iconAlt="user"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                icon={Mail}
                iconAlt="email"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 md:pt-4">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone number"
                placeholder="(555) 123-4567"
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Fecha de nacimiento"
                icon={Calendar}
                iconAlt="calendar"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 md:pt-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryProfessional"
                label="Profesional"
                placeholder="Selecciona un profesional"
              >
                {Abogados.map((abogado, i) => (
                  <SelectItem key={abogado.name + i} value={abogado.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={abogado.image}
                        width={32}
                        height={32}
                        alt="abogado"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{abogado.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="documentoDni"
                label="DNI"
                placeholder="12345678"
                icon={KeySquare}
                iconAlt="dni"
              />
            </div>

            <div className="pt-2 md:pt-4">
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="documentoUrlPhoto"
                label="Adjunta foto de tu DNI"
                renderSkeleton={(field) => (
                  <FormControl>
                    <FileUploader
                      files={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}
              />
            </div>

            <section className="space-y-6">
              <div className="mb-9 space-y-1">
                <h2 className="sub-header">Consent and Privacy</h2>
              </div>

              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="privacyConsent"
                label="Doy consentimiento para el uso de mis datos"
              />
            </section>

            <SubmitButton className="mt-8" isLoading={isLoading}>
              Get Started
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
