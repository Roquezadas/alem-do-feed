import { cn } from "@/lib/utils";

export function Section({
  id,
  label,
  title,
  intro,
  children,
  dark = false,
  className,
}: {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 border-t px-4 py-16 md:px-8 md:py-24", dark && "surface-dark", className)}
    >
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          {label ? <span className="label-mono text-primary">{label}</span> : null}
          <h2 className="mt-3 text-3xl leading-[0.95] font-extrabold tracking-tight uppercase md:text-5xl">
            {title}
          </h2>
          {intro ? (
            <p className={cn("mt-4 text-base leading-relaxed", dark ? "opacity-75" : "text-muted-foreground")}>
              {intro}
            </p>
          ) : null}
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
