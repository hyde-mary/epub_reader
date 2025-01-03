import { auth } from "@/auth";
import BookReader from "@/components/book-reader";
import { client } from "@/sanity/lib/client";
import { BOOKS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound, redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const id = (await params).id;
  const book = await client.fetch(BOOKS_BY_ID_QUERY, { id });

  if (!book) return notFound();

  return (
    <>
      <BookReader book={book} />
    </>
  );
};

export default Page;
