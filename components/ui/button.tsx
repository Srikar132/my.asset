import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
};

const variants = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  outline: "border border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.07] hover:border-white/20",
  ghost: "text-foreground/70 hover:bg-white/[0.05] hover:text-foreground",
};

const sizes = {
  default: "h-10 px-4",
  sm: "h-9 rounded-md px-3 text-xs",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
);

Button.displayName = "Button";
