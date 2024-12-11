"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerActionResponse } from "./utils";

interface uploadBookProps {
  title: string;
  author: string;
  image_url: string;
  file_path: string;
  file_url: string;
}

// export uploadBook function
export const uploadBook = async ({
  title,
  author,
  image_url,
  file_path,
  file_url,
}: uploadBookProps) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not Authenticated!",
      status: "error",
    });

  try {
    const book = {
      title,
      author,
      image_url,
      user: {
        _type: "reference",
        _ref: session?.id,
      },
      file_path,
      file_url,
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
