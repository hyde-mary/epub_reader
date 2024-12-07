"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";

export const updateBook = async (
  state: unknown,
  form: FormData,
  _id: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not Authenticated!",
      status: "error",
    });

  const { title, author, image_url } = Object.fromEntries(Array.from(form));

  try {
    const result = await writeClient
      .patch(_id)
      .set({
        title,
        author,
        image_url,
      })
      .commit();

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "success",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "error",
    });
  }
};
