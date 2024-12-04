import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().refine((phone) => /^\+?[0-9]{10,14}$/.test(phone), {
    message: "Invalid phone number.",
  }),
});
