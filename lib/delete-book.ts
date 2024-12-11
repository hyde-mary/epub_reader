"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";
import { supabase } from "@/lib/supabase-client";

interface DeleteBookProps {
  id: string;
  file_path: string;
}

export const deleteBook = async ({ id, file_path }: DeleteBookProps) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not Authenticated!",
      status: "error",
    });
  }

  try {
    const { data, error } = await supabase.storage
      .from("epub-files")
      .remove([file_path]);

    if (error) {
      console.error("Error deleting file", error.message);
      throw new Error("Failed to delete file");
    }

    const documentResult = await writeClient.delete(id);

    if (!documentResult) {
      throw new Error("Document deletion failed. Stopping further operations.");
    }

    return parseServerActionResponse({
      data: { documentResult, data },
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
