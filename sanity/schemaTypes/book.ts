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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image_url",
      title: "Image URL",
      type: "url",
      description: "Upload a cover image for the book",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file_path",
      title: "File Path",
      type: "string",
      description: "PATH for the Uploaded Book: It should be from Supabase",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file_url",
      title: "File URL",
      type: "string",
      description: "URL for the Uploaded Book: URL should be from Supabase",
      validation: (Rule) => Rule.required(),
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
