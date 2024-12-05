import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import Image from "next/image";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
  } = props;
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={20}
              height={20}
            />
          )}
          <FormControl>
            <Input {...field} placeholder={placeholder} disabled={disabled} />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <div>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={20}
              height={20}
            />
          )}
          <FormControl>
            <Input {...field} placeholder={placeholder} disabled={disabled} />
          </FormControl>
        </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
  } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel htmlFor={name}>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
