/** Frame aberto: uma moldura que não contém completamente o que mostra. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
      strokeWidth="2.5"
    >
      <path d="M4 10V4h8" stroke="currentColor" strokeLinecap="square" />
      <path d="M4 22v6h8" stroke="currentColor" strokeLinecap="square" />
      <path d="M28 22v6h-8" stroke="currentColor" strokeLinecap="square" />
      <path d="M19 13h13" className="text-primary" stroke="currentColor" strokeLinecap="square" />
      <path d="M22 8l6 5-6 5" className="text-primary" stroke="currentColor" strokeLinecap="square" />
    </svg>
  );
}
