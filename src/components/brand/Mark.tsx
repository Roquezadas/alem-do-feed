/** Símbolo da marca: moldura, ondas sonoras e microfone. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" className={className} role="img">
      <rect width="128" height="128" rx="18" fill="#08090a" />
      <rect
        x="13"
        y="13"
        width="102"
        height="102"
        rx="28"
        fill="none"
        stroke="#f4f0e7"
        strokeWidth="8"
      />
      <circle cx="96" cy="31" r="6" fill="#f4f0e7" />
      <path d="M43 50a23 23 0 0 1 42 0H72a11 11 0 0 0-16 0H43Z" fill="#f4f0e7" />
      <path d="M43 79h13a11 11 0 0 0 16 0h13a23 23 0 0 1-42 0Z" fill="#f4f0e7" />
      <g fill="#c62f34">
        <rect x="25" y="58" width="4" height="13" rx="2" />
        <rect x="31" y="54" width="4" height="21" rx="2" />
        <rect x="37" y="51" width="4" height="27" rx="2" />
        <rect x="43" y="55" width="4" height="19" rx="2" />
        <rect x="49" y="59" width="4" height="11" rx="2" />
        <rect x="75" y="59" width="4" height="11" rx="2" />
        <rect x="81" y="55" width="4" height="19" rx="2" />
        <rect x="87" y="51" width="4" height="27" rx="2" />
        <rect x="93" y="54" width="4" height="21" rx="2" />
        <rect x="99" y="58" width="4" height="13" rx="2" />
      </g>
      <rect x="58" y="49" width="12" height="27" rx="6" fill="#f4f0e7" />
      <g fill="none" stroke="#f4f0e7" strokeWidth="5" strokeLinecap="round">
        <path d="M53 66v4a11 11 0 0 0 22 0v-4" />
        <path d="M64 81v8M57 89h14" />
      </g>
      <g stroke="#08090a" strokeWidth="1.5">
        <path d="M65 56h5M65 60h5M65 64h5" />
      </g>
    </svg>
  );
}
