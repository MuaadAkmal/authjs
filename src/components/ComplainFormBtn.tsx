import React from "react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function ComplainFormBtn() {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button type="submit" className="w-full" disabled={pending}>
        <Send className="mr-2 h-4 w-4" /> Submit Request
      </Button>
    </div>
  );
}
