import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all duration-400 ease-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Sophisticated premium variants for 30-65 demographic
        gold: "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-medium tracking-wide shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-400",
        goldOutline: "border border-gold/60 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-400 tracking-wide",
        hero: "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-medium text-base px-8 py-6 shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-400 uppercase tracking-widest",
        heroOutline: "border border-gold/40 text-foreground hover:border-gold/80 hover:text-gold bg-transparent backdrop-blur-sm transition-all duration-400 uppercase tracking-widest text-base px-8 py-6",
        // Elegant minimal variants
        elegant: "bg-secondary text-foreground border border-border/50 hover:bg-muted hover:border-gold/30 transition-all duration-400 tracking-wide",
        elegantPrimary: "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 hover:border-gold/50 transition-all duration-400 tracking-wide",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-sm px-4 text-sm",
        lg: "h-12 rounded-sm px-8 text-base",
        xl: "h-14 rounded-sm px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };