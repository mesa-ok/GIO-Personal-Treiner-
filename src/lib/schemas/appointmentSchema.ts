
import { z } from "zod";

export const appointmentSchema = z.object({
  title: z.string().min(1, "Il titolo è obbligatorio"),
  location: z.string().min(1, "La location è obbligatoria"),
  date: z.date({
    required_error: "Seleziona una data",
  }),
  time: z.string({
    required_error: "Seleziona un orario",
  }),
  description: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
