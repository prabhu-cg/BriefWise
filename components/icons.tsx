type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Copy = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </svg>
);
export const Check = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);
export const Info = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);
export const AlertTriangle = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 4 3 20h18L12 4Z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </svg>
);
export const Pencil = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
  </svg>
);
export const Sparkle = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M12 5v14" />
  </svg>
);
export const Download = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);
export const Printer = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2" />
    <rect x="7" y="14" width="10" height="6" rx="1" />
  </svg>
);
export const Refresh = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M20 11a8 8 0 0 0-14-4.5L4 9M4 5v4h4M4 13a8 8 0 0 0 14 4.5L20 15M20 19v-4h-4" />
  </svg>
);
export const Plus = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Close = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
