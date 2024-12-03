import { auth } from "@/auth";
import Navbar from "@/components/nav-bar";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const id = (await params).id;

  return (
    <>
      <Navbar username={session?.user?.name} image={session?.user?.image} />
      <section className="h-screen flex justify-center">
        <div className="max-w-full mt-28">{id}</div>
      </section>
    </>
  );
};

export default Page;
