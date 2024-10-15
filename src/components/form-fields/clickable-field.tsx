"use client";

import { useController } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormFieldCustom } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface ClickableFieldProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    control?: Control<T>;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    description?: string;
    concept?: Concept;
    styles?: {
        button?: string;
        selected?: string;
    };
}

export function ClickableField<T extends FieldValues = FieldValues>({
    name,
    label,
    control,
    required = false,
    disabled = false,
    className,
    description,
    concept,
    styles = {
        selected:
            "border-2 border-secondary hover:bg-transparent hover:shadow-sm",
    },
}: ClickableFieldProps<T>) {
    const { field } = useController({
        name,
        control,
    });

    const handleOnClick = () => {
        field.onChange(!field.value);
    };

    return (
        <FormFieldCustom
            name={name}
            description={description}
            required={required}
            concept={concept}
            className={className}
            control={control}
            render={() => (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleOnClick}
                    disabled={disabled}
                    className={cn(
                        "w-full",
                        styles.button,
                        field.value && styles.selected
                    )}
                    aria-pressed={field.value}
                >
                    {label}
                </Button>
            )}
        />
    );
}

export default ClickableField;
