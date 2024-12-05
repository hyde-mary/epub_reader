import { auth } from "@/auth";
import BookReader from "@/components/book-reader";
import { client } from "@/sanity/lib/client";
import { BOOKS_BY_ID_QUERY, FILE_QUERY_BY_ID } from "@/sanity/lib/queries";
import { notFound, redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const id = (await params).id;

  if (!id) {
    throw new Error("Something unexpected occurred");
  }

  const book = await client.fetch(BOOKS_BY_ID_QUERY, { id });

  if (!book) return notFound();

  const title = book.title;
  const file_id = book.file_id;
  const file = await client.fetch(FILE_QUERY_BY_ID, { file_id });

  return (
    <>
      <section>
        <BookReader file={file} title={title} />
      </section>
    </>
  );
};

export default Page;
