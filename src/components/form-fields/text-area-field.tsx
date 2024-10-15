"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldCustom } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    rows?: number;
    concept?: Concept;
    className?: string;
    control?: Control<T>;
};

export function TextareaField<T extends FieldValues = FieldValues>({
    name,
    label,
    description,
    placeholder = "",
    required = false,
    disabled = false,
    rows = 3,
    concept,
    className,
    control,
}: TextareaFieldProps<T>) {
    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            concept={concept}
            className={className}
            control={control}
            render={({ field }) => (
                <Textarea
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={rows}
                    {...field}
                />
            )}
        />
    );
}

export default TextareaField;
