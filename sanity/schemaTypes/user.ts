import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  // the fields go here
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
