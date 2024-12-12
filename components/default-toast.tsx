"use client";

import { useToast } from "@/hooks/use-toast";

type ToastProps = {
  variant?: "default";
  title?: string;
  description?: string;
};

const TriggerDefaultToast = ({
  variant = "default",
  title,
  description,
}: ToastProps) => {
  const { toast } = useToast();

  return toast({
    variant,
    title,
    description,
  });
};

export default TriggerDefaultToast;
