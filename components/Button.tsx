'use client';

import Link from 'next/link';
import LeftBrace from './LeftBrace';
import RightBrace from './RightBrace';

interface BraceButtonProps {
  children: React.ReactNode;
  className?: string;
  braceClassName?: string;
  braceStrokeWidth?: number;
  braceColor?: string;
  onClick?: () => void;
  transitionDuration?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  className = '',
  braceClassName = 'h-full w-3',
  braceStrokeWidth = 2,
  braceColor = 'white',
  onClick,
  transitionDuration = '300ms',
  type = 'button',
  href,
  target,
  svgColor,
  rel
}: BraceButtonProps & { svgColor?: string }) {
  const content = (
    <>
      {/* LEFT BRACE */}
      <div
        className="h-full"
        style={{ transitionDuration }}
      >
        <LeftBrace
          color={svgColor}
        />
      </div>

      {/* BUTTON CONTENT */}
      <span className="flex-1 uppercase">{children}</span>

      {/* RIGHT BRACE */}
      <div
        className=" h-full"
        style={{ transitionDuration }}
      >
        <RightBrace
          color={svgColor}
        />
      </div>
    </>
  );

  const sharedClassName = `group relative flex items-center gap-2 px-2  transition-all cursor-pointer ${className}`;
  const sharedStyle = { transitionDuration };

  // Render as Link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={sharedClassName}
        style={sharedStyle}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={sharedClassName}
      style={sharedStyle}
    >
      {content}
    </button>
  );
}
