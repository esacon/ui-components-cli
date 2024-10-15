import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const buttonVariants = tv({
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default:
                "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
            accent: "bg-tertiary text-white shadow-sm hover:bg-tertiary/90",
            primary: "bg-primary text-primary-foreground hover:bg-primary/80",
            schoolboost:
                "bg-primary text-primary-foreground shadow-sm hover:bg-secondary/90",
            destructive:
                "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline:
                "border border-input bg-transparent shadow-sm hover:bg-primary/80 hover:text-primary-foreground",
            secondary:
                "bg-secondary text-white shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-0",
            link: "text-primary underline-offset-4 hover:underline",
            success:
                "bg-success-foreground text-primary-foreground shadow-sm hover:bg-success-foreground/90",
            payment:
                "bg-[#49c1db] text-primary-foreground font-semibold hover:bg-opacity-80",
            print: "bg-[#e2007a] text-primary-foreground font-semibold hover:bg-opacity-80",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-9 w-9",
            mark: "h-7 w-7 p-1",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "sm",
    },
});

interface ButtonProps
    extends React.ComponentPropsWithoutRef<"button">,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            asChild,
            isLoading = false,
            loadingText,
            className,
            disabled,
            variant,
            size,
            children,
            ...props
        }: ButtonProps,
        forwardedRef
    ) => {
        const Component = asChild ? Slot : "button";
        return (
            <Component
                ref={forwardedRef}
                className={cn(buttonVariants({ variant, size }), className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
                        <Icon
                            name="spinner"
                            className="size-4 shrink-0 animate-spin"
                            aria-hidden="true"
                        />
                        <span className="sr-only">
                            {loadingText ? loadingText : "Laden"}
                        </span>
                        {loadingText ? loadingText : children}
                    </span>
                ) : (
                    children
                )}
            </Component>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
