import React from 'react';

// Paper Kite Studio wordmark: kite mark + name, text follows currentColor
export const LogoTextComponent = () => {
  return (
    <svg
      width="236"
      height="44"
      viewBox="0 0 236 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Paper Kite Studio"
    >
      <g transform="scale(0.7333)">
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
      </g>
      <text
        x="54"
        y="29"
        fontSize="21"
        fontWeight="700"
        fill="currentColor"
        fontFamily="inherit"
      >
        Paper Kite <tspan fill="#FF7A2F">Studio</tspan>
      </text>
    </svg>
  );
};
