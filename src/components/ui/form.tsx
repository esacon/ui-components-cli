import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from "react-hook-form";
import { MoreInfoButton } from "@/components/buttons/more-info-button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

interface FormFieldCustomProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
    label?: React.ReactNode;
    required?: boolean;
    description?: React.ReactNode;
    errorMsg?: string;
    concept?: Concept;
    className?: string;
}

const FormFieldCustom = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    label,
    description,
    className,
    render,
    required = false,
    errorMsg,
    concept,
    ...props
}: FormFieldCustomProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller
                {...props}
                render={(field) => (
                    <FormItem className={cn("mx-1", className)}>
                        {!!label && (
                            <FormLabel required={required} concept={concept}>
                                {label}
                            </FormLabel>
                        )}
                        <FormControl>{render(field)}</FormControl>
                        {!!description && (
                            <FormDescription className="text-xs">
                                {description}
                            </FormDescription>
                        )}
                        <FormMessage className="text-xs text-red-500 dark:text-red-400">
                            {errorMsg}
                        </FormMessage>
                    </FormItem>
                )}
            />
        </FormFieldContext.Provider>
    );
};
FormFieldCustom.displayName = "FormFieldCustom";

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
);

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    );
});
FormItem.displayName = "FormItem";

interface FormLabelProps
    extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean;
    concept?: Concept;
}

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    FormLabelProps
>(({ className, required, concept, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            className={cn(
                "flex items-center gap-x-1",
                error && "text-destructive",
                className
            )}
            htmlFor={formItemId}
            {...props}
        >
            {props.children}
            {!required && <span aria-hidden="true">(Optional)</span>}
            {!!concept && <MoreInfoButton concept={concept} />}
        </Label>
    );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
        return null;
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn(
                "text-sm font-medium text-danger-foreground",
                className
            )}
            {...props}
        >
            {body}
        </p>
    );
});
FormMessage.displayName = "FormMessage";

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
    FormFieldCustom,
};
