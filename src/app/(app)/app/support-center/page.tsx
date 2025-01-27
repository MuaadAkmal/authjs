"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { registerComplaint } from "@/serverActions/actions";
import ComplainFormBtn from "@/components/ComplainFormBtn";
import { z } from "zod";
import { useRouter } from "next/navigation";

type TSupportType = "complaint" | "assistance";
const ComplaintSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  supportType: z.union([z.literal("complaint"), z.literal("assistance")]),
});

export default function SupportCenter() {
  const [supportType, setSupportType] = useState<TSupportType>("complaint");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
      supportType,
    };

    const validatedData = ComplaintSchema.safeParse(data);

    if (!validatedData.success) {
      toast.error(validatedData.error.errors[0].message);
      return;
    }

    try {
      await registerComplaint(validatedData.data);
      toast.success(`${supportType} registered successfully`);
      setName("");
      setEmail("");
      setMessage("");
      setSupportType("complaint");
      router.push("/app/dashboard");
    } catch {
      toast.error(`Error in registering ${supportType}`);
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Support Center
          </CardTitle>
          <CardDescription className="text-center">
            {"We're"} here to help. Let us know how we can assist you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue="complaint"
              className="flex space-x-4"
              onValueChange={(value) => setSupportType(value as TSupportType)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complaint" id="complaint" />
                <Label htmlFor="complaint" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Complaint
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="assistance" id="assistance" />
                <Label htmlFor="assistance" className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Assistance
                </Label>
              </div>
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                {supportType === "complaint"
                  ? "Describe your complaint"
                  : "How can we assist you?"}
              </Label>
              <Textarea
                id="message"
                placeholder={
                  supportType === "complaint"
                    ? "Please provide details about your complaint..."
                    : "Please describe how we can help you..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <ComplainFormBtn />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
