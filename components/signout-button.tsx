import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOut() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="default"
      className="flex items-center"
      onClick={handleSignOut}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign out
    </Button>
  );
}
