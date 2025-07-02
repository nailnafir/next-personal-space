import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Masukin email yang benar ya"),
});

export const commentSchema = z.object({
  articleId: z.string({
    required_error: "Kode artikel wajib ada",
  }),
  content: z
    .string()
    .min(1, { message: "Komentar wajib diisi" })
    .max(255, { message: "Komentar maksimal 255 karakter" }),
  authorId: z.number().nullable().optional(),
});
