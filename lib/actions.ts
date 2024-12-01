"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";

// Helper to upload the file to sanity assets
const uploadFileToSanity = async (file: File) => {
  const fileAsset = await writeClient.assets.upload("file", file, {
    filename: file.name,
  });
  return fileAsset;
};

// export uploadBook function
export const uploadBook = async (
  state: unknown,
  form: FormData,
  file: File | null
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not Authenticated!",
      status: "error",
    });

  const { title, author, image_url } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "file")
  );

  try {
    let fileReference = null;
    if (file) {
      const fileAsset = await uploadFileToSanity(file);
      fileReference = fileAsset._id;
    }

    const book = {
      title,
      author,
      image_url,
      user: {
        _type: "reference",
        _ref: session?.id,
      },
      file_id: fileReference as string,
      file: fileReference
        ? { _type: "file", asset: { _ref: fileReference } }
        : null,
    };

    const result = await writeClient.create({ _type: "book", ...book });

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

export const deleteBook = async (id: string) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not Authenticated!",
      status: "error",
    });
  }

  try {
    const result = await writeClient.delete(id);

    return parseServerActionResponse({
      data: result,
      status: "success",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "error",
    });
  }
};
