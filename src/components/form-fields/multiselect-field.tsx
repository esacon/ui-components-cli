"use client";

import { useEffect, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { MultiDropdown } from "@/components/ui/dropdown-multiple";
import { FormFieldCustom } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Option = {
    value: string;
    label: string;
};

type MultiSelectFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    description?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    concept?: Concept;
    max?: number;
    min?: number;
    labelsLength?: number;
    className?: string;
    control?: Control<T>;
    styles?: {
        trigger?: string;
        content?: string;
        item?: string;
        input?: string;
    };
} & (
    | {
          displayIcon: boolean;
          options: (Option & { image: string | undefined })[];
      }
    | {
          displayIcon?: false;
          options: Option[];
      }
);

export function MultiSelectField<T extends FieldValues = FieldValues>({
    name,
    label,
    description,
    placeholder = "Auswählen",
    required = false,
    options,
    className,
    disabled = false,
    displayIcon = false,
    concept,
    max,
    min,
    labelsLength = 2,
    control,
    styles,
}: MultiSelectFieldProps<T>) {
    const [error, setError] = useState<string | undefined>(undefined);

    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            concept={concept}
            errorMsg={error}
            className={cn("relative w-full", className)}
            control={control}
            render={({ field }) => {
                const selectedValues = (field.value as string[]) || [];

                const handleSelect = (selectedValues: string[]) => {
                    if (max !== undefined && selectedValues.length > max) {
                        setError(
                            `Sie können maximal ${max} Optionen auswählen.`
                        );
                        return;
                    }

                    if (min !== undefined && selectedValues.length < min) {
                        setError(
                            `Sie müssen mindestens ${min} Optionen auswählen.`
                        );
                    } else {
                        setError(undefined);
                    }

                    field.onChange(selectedValues);
                };

                useEffect(() => {
                    if (min !== undefined && selectedValues.length < min) {
                        setError(
                            `Sie müssen mindestens ${min} Optionen auswählen.`
                        );
                    } else {
                        setError(undefined);
                    }
                }, [min, selectedValues]);

                return (
                    <MultiDropdown
                        options={options}
                        placeholder={placeholder}
                        emptyMessage="Keine Ergebnisse gefunden."
                        searchPlaceholder="Suche..."
                        onChange={handleSelect}
                        value={selectedValues}
                        disabled={disabled}
                        displayIcon={displayIcon}
                        labelsLength={labelsLength}
                        className={styles?.trigger}
                        styles={styles}
                    />
                );
            }}
        />
    );
}

export default MultiSelectField;
