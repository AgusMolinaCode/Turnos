/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Male" | "Female" | "Other";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    primaryProfessional: string;
    documentoDni: string | undefined;
    documentoUrlPhoto: FormData | undefined;
    privacyConsent: boolean;
  }
  
  declare type CreateAppointmentParams = {
    userId: string;
    // patient: string;
    cliente: string;
    primaryProfessional: string;
    description: string;
    schedule: Date;
    status: Status;
    notes: string | undefined;
  };
  
  declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
  };