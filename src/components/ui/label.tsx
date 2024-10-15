import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
    "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface FormLabelProps
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean;
}

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    FormLabelProps & VariantProps<typeof labelVariants>
>(({ className, required = false, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    >
        {props.children}
    </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
