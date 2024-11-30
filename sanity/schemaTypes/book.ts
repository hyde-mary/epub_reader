import { Book } from "lucide-react";
import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  icon: Book,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "author",
      type: "string",
    }),
    defineField({
      name: "user",
      type: "reference",
      to: { type: "user" },
    }),
    defineField({
      name: "image_url",
      type: "url",
    }),
    defineField({
      name: "file_id",
      type: "string",
    }),
    {
      name: "file",
      title: "File",
      type: "file",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
