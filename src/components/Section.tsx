import { cn } from "@/lib/utils";

export function Section({
  id,
  label,
  title,
  intro,
  children,
  dark = false,
  index,
  atmosphere = "paper",
  className,
}: {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  dark?: boolean;
  index?: string;
  atmosphere?: "paper" | "ink" | "digital" | "consequence";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "editorial-section scroll-mt-24 border-t px-4 py-20 md:px-8 md:py-32",
        dark && "surface-dark",
        `atmosphere-${dark ? "ink" : atmosphere}`,
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <header className="editorial-section-head">
          {index ? (
            <span className="editorial-section-index" aria-hidden="true">
              {index}
            </span>
          ) : null}
          <div className="relative z-10 max-w-3xl">
            {label ? <span className="label-mono text-primary">{label}</span> : null}
            <h2 className="mt-3 text-4xl leading-[0.9] font-extrabold tracking-[-0.055em] uppercase md:text-6xl">
              {title}
            </h2>
          </div>
          {intro ? (
            <p
              className={cn(
                "relative z-10 max-w-md text-base leading-relaxed md:justify-self-end",
                dark ? "opacity-75" : "text-muted-foreground",
              )}
            >
              {intro}
            </p>
          ) : null}
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
