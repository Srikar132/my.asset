interface RightBraceProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
  viewBox?: string;
}

export default function RightBrace({ 
  className = "h-full w-auto text-white",
  strokeWidth = 1,
  color = "currentColor",
  viewBox = "0 0 50 100"
}: RightBraceProps) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
    >
      <path
        d="M 10 10 
           C 20 10, 25 10, 28 15
           C 28 20, 28 35, 28 42
           C 28 46, 30 48, 35 50
           C 30 52, 28 54, 28 58
           C 28 65, 28 80, 28 85
           C 25 90, 20 90, 10 90"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

