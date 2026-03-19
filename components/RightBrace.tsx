interface RightBraceProps {
  pathRef?: React.Ref<SVGPathElement>;
  visibility? : string
}
function RightBrace({ pathRef, visibility }: RightBraceProps) {
  return (
    <svg className="h-full w-auto text-white" style={{ visibility : visibility as React.CSSProperties['visibility'] }} viewBox="0 0 50 100" fill="none">
      <path
        ref={pathRef}
        d="M 10 10 
           C 20 10, 25 10, 28 15
           C 28 20, 28 35, 28 42
           C 28 46, 30 48, 35 50
           C 30 52, 28 54, 28 58
           C 28 65, 28 80, 28 85
           C 25 90, 20 90, 10 90"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RightBrace;