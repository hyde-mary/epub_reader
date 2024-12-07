import { auth } from "@/auth";
import UpdateForm from "@/components/update-form";
import { client } from "@/sanity/lib/client";
import { BOOKS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  const id = (await params).id;

  if (!session) {
    redirect("/");
  }

  const book = await client.fetch(BOOKS_BY_ID_QUERY, { id });

  return (
    <div>
      <UpdateForm book={book} />
    </div>
  );
};

export default Page;
