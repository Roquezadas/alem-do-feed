import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils";

export function BrandLogo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("brand-logo", compact && "brand-logo-compact", className)}
      aria-hidden="true"
    >
      <Mark className="brand-logo-mark" />
      <span className="brand-logo-type">
        <strong>ALÉM</strong>
        <small>DO</small>
        <strong>FEED</strong>
      </span>
    </span>
  );
}
