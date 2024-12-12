import { useToast } from "@/hooks/use-toast";

type ToastProps = {
  variant?: "destructive";
  title?: string;
  description?: string;
};

const TriggerDestructiveToast = ({
  variant = "destructive",
  title = "Something Happened!",
  description = "An unexpected error occurred",
}: ToastProps) => {
  const { toast } = useToast();

  return toast({
    variant,
    title,
    description,
  });
};

export default TriggerDestructiveToast;
