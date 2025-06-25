import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  providerId: z.string().min(1, "Doctor is required"),
  patientId: z.string().min(1, "Patient is required"),
  locationId: z.string().min(1, "Room is required").optional(),
});

export type TEventFormData = z.infer<typeof eventSchema>;
