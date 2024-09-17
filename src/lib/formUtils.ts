import { toast } from "@/hooks/use-toast";

export const handleClipboardEvents = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();
  toast({
    description: "Copying and pasting is not allowed in this field.",
    variant: "destructive",
    className: "p-5",
  });
};