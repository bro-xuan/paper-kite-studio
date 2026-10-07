'use client';

// Paper Kite Studio mark: a paper kite with a cross-spar and a tangerine tail
export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="mt-[8px] min-w-[60px] min-h-[60px]"
      aria-label="Paper Kite Studio"
    >
      <rect width="60" height="60" rx="14" fill="#2F4FE0" />
      <path
        d="M30 7 L45 22 L30 41 L15 22 Z"
        fill="#F7F3EA"
        stroke="#1A1A2E"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M30 7 V41 M15 22 H45"
        stroke="#1A1A2E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30 41 C25 44.5 35 47 30 50.5 C25 54 33 55.5 29 58"
        stroke="#FF7A2F"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M27.2 45.2 L30.4 44.4 L29.2 47.4 Z M30.6 51.6 L33.4 50.4 L32.6 53.4 Z"
        fill="#FF7A2F"
      />
    </svg>
  );
};
