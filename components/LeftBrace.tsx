interface LeftBraceProps {
  pathRef?: React.Ref<SVGPathElement>;
  visibility?: string;
  color?: string;
}
function LeftBrace({ pathRef, visibility, color }: LeftBraceProps) {
  return (
    <svg className="h-full w-auto" color={color} style={{ visibility: visibility as React.CSSProperties['visibility'] }} viewBox="0 0 50 100" fill="none">

      <path
        ref={pathRef}
        d="M 40 10 
           C 30 10, 25 10, 22 15
           C 22 20, 22 35, 22 42
           C 22 46, 20 48, 15 50
           C 20 52, 22 54, 22 58
           C 22 65, 22 80, 22 85
           C 25 90, 30 90, 40 90"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LeftBrace;