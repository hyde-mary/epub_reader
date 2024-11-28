import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  // we also check here if the user is logged in, if so, just redirect to /
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-slate-950">
      <LoginForm />
    </div>
  );
};

export default page;
