import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  asChild?: boolean;
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

const buttonClasses = (variant: ButtonProps["variant"], size: ButtonProps["size"], className: string) =>
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 ${variants[variant ?? "default"]} ${sizes[size ?? "default"]} ${className}`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = buttonClasses(variant, size, className);

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: `${classes} ${children.props.className ?? ""}`,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
