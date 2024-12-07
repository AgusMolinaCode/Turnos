"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { createUser, registerUser } from "@/lib/actions/client.actions";
import { ClientFormValidation, UserFormValidation } from "@/lib/validation";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { Abogados } from "@/constants";
import { FileUploader } from "../FileUploader";

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
    if (
      values.documentoUrlPhoto &&
      values.documentoUrlPhoto?.length > 0
    ) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <section className="mb-12 ">
          <p className="text-dark-700">Register Form {user.name}</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

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
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryProfessional"
          label="Primary Professional"
          placeholder="Select a professional"
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

        {/* TODO Identificacion */}

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificación y Verificación</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="documentoDni"
            label="DNI"
            placeholder="12345678"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="documentoUrlPhoto"
            label="Adjunta foto de tu DNI"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

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
  );
};
