import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

interface UploadFormFooterProps {
  isPending: boolean;
}

const UploadFormFooter = ({ isPending }: UploadFormFooterProps) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or Cancel with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => redirect("/")}
        disabled={isPending}
      >
        Cancel
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking upload, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
};

export default UploadFormFooter;
