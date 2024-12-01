"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const BookCardRead = ({ id }: { id: string }) => {
  return (
    <Button className="w-full" onClick={() => redirect(`/book/${id}`)}>
      Read Now
    </Button>
  );
};

export default BookCardRead;
