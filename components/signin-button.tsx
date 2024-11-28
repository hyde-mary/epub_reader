"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, Loader } from "lucide-react";
import { useState } from "react";

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("github");
  };

  return (
    <Button
      variant="outline"
      className="w-full bg-slate-200 text-slate-800"
      type="submit"
      onClick={handleSignIn}
      disabled={loading}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 mr-2">
          <Loader />
        </span>
      ) : (
        <>
          <Github className="mr-2" /> Login with GitHub
        </>
      )}
    </Button>
  );
}
