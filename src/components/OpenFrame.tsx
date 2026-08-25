import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrameVariant = "default" | "media" | "evidence" | "alert";
type FrameOrientation = "top-right" | "bottom-right" | "top-left" | "bottom-left";

export function OpenFrame({
  children,
  variant = "default",
  orientation = "bottom-right",
  animated = false,
  className,
}: {
  children?: ReactNode;
  variant?: FrameVariant;
  orientation?: FrameOrientation;
  animated?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "open-frame",
        `open-frame-${variant}`,
        `open-frame-${orientation}`,
        animated && "open-frame-animated",
        className,
      )}
    >
      {children}
    </div>
  );
}
