"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Dropdown } from "@/components/ui/dropdown";
import { FormFieldCustom } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Option = {
    value: string;
    label: string;
};

type DropdownFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    description?: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    concept?: Concept;
    options: Option[];
    control?: Control<T>;
    styles?: {
        trigger?: string;
        content?: string;
        item?: string;
        input?: string;
    };
};

export function DropdownField<T extends FieldValues = FieldValues>({
    name,
    label,
    description,
    placeholder = "Auswählen",
    required = false,
    options,
    concept,
    className,
    disabled = false,
    control,
    styles,
}: DropdownFieldProps<T>) {
    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            concept={concept}
            className={cn("relative w-full", className)}
            control={control}
            render={({ field }) => (
                <Dropdown
                    options={options}
                    placeholder={placeholder}
                    emptyMessage="Diese Option war nicht gefunden."
                    searchPlaceholder="Suchen..."
                    onChange={field.onChange}
                    value={field.value}
                    disabled={disabled}
                    className={styles?.trigger}
                    styles={styles}
                />
            )}
        />
    );
}

export default DropdownField;
