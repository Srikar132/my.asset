interface LeftBraceProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
  viewBox?: string;
}

export default function LeftBrace({ 
  className = "h-full w-auto text-white",
  strokeWidth = 1,
  color = "currentColor",
  viewBox = "0 0 50 100"
}: LeftBraceProps) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
    >
      <path
        d="M 40 10 
           C 30 10, 25 10, 22 15
           C 22 20, 22 35, 22 42
           C 22 46, 20 48, 15 50
           C 20 52, 22 54, 22 58
           C 22 65, 22 80, 22 85
           C 25 90, 30 90, 40 90"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

