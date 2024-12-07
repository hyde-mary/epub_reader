"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";

export const deleteBook = async (id: string, file_id: string) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not Authenticated!",
      status: "error",
    });
  }

  try {
    const documentResult = await writeClient.delete(id);

    if (!documentResult) {
      throw new Error("Document deletion failed. Stopping further operations.");
    }

    const assetResult = await writeClient.delete(file_id);

    return parseServerActionResponse({
      data: { documentResult, assetResult },
      status: "success",
    });
  } catch (error) {
    // Handle any errors that occur during deletion
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "error",
    });
  }
};
