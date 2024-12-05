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
      title: "Title",
      type: "string",
      description: "The title of the book",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "The author of the book",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      description: "The user associated with this book",
    }),
    defineField({
      name: "image_url",
      title: "Image URL",
      type: "url",
      description: "Upload a cover image for the book",
    }),
    defineField({
      name: "file",
      title: "EPUB File",
      type: "file",
      description: "Upload the EPUB file for the book",
      options: {
        accept: ".epub",
      },
    }),
    defineField({
      name: "file_id",
      title: "File ID",
      type: "string",
      description: "Unique ID for the uploaded EPUB file (optional)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
    },
    prepare(selection) {
      const { title, author, media } = selection;
      return {
        title: title,
        subtitle: author ? `by ${author}` : "No author specified",
        media: media,
      };
    },
  },
});
