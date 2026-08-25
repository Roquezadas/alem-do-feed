import { cn } from "@/lib/utils";

type Tone =
  | "default"
  | "cobalt"
  | "coral"
  | "ink"
  | "outline"
  | "editorial"
  | "legal"
  | "evidence"
  | "risk"
  | "digital";

const tones: Record<Tone, string> = {
  default: "bg-muted text-foreground",
  cobalt: "bg-primary text-primary-foreground",
  coral: "bg-accent text-accent-foreground",
  ink: "bg-foreground text-background",
  outline: "border border-current text-muted-foreground",
  editorial: "bg-muted text-foreground",
  legal: "bg-foreground text-background",
  evidence: "border border-primary text-primary",
  risk: "bg-accent text-accent-foreground",
  digital: "bg-primary text-primary-foreground",
};

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={cn("label-mono inline-flex items-center px-2 py-1", tones[tone], className)}>
      {children}
    </span>
  );
}
