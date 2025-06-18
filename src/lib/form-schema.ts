import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Masukin email yang benar ya"),
});
