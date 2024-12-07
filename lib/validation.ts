import { z } from "zod";

export const createBookFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  author: z
    .string()
    .min(3, { message: "Author must be at least 3 characters long." })
    .max(50, { message: "Author must not exceed 50 characters." }),
  image_url: z
    .string()
    .url({ message: "Please provide a valid URL. " })
    .refine((url) => /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url), {
      message: "The URL must point to a valid image file (e.g., .jpg, .png)",
    }),
  file: z
    .instanceof(File)
    .refine((file) => file.type === "application/epub+zip", {
      message: "Only EPUB files are allowed.",
    }),
});

export const updateBookFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  author: z
    .string()
    .min(3, { message: "Author must be at least 3 characters long." })
    .max(50, { message: "Author must not exceed 50 characters." }),
  image_url: z
    .string()
    .url({ message: "Please provide a valid URL. " })
    .refine((url) => /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url), {
      message: "The URL must point to a valid image file (e.g., .jpg, .png)",
    }),
});
