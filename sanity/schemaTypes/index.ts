import { type SchemaTypeDefinition } from "sanity";
import { user } from "./user";
import { book } from "./book";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, book],
};
