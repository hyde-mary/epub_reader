import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
        variant="outline"
        className="w-full bg-slate-200 text-slate-800"
        type="submit"
      >
        <Github /> Login with GitHub
      </Button>
    </form>
  );
}
