import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full bg-white shadow-md ring-1 ring-black/10 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}
