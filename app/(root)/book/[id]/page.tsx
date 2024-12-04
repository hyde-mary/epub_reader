import { auth } from "@/auth";
import BookReader from "@/components/book-reader";
import { client } from "@/sanity/lib/client";
import { FILE_FOR_BOOK_QUERY } from "@/sanity/lib/queries";
import { notFound, redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const id = (await params).id;

  const file = await client.fetch(FILE_FOR_BOOK_QUERY, { id });

  if (!file) {
    return notFound();
  }

  file.url = "https://react-reader.metabits.no/files/alice.epub";

  return (
    <>
      <section>
        <BookReader file={file} />
      </section>
    </>
  );
};

export default Page;
