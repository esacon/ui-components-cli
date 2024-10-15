"use client";

import { useController } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormFieldCustom } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Option = {
    value: string;
    label: React.ReactNode | string;
    disabled?: boolean;
};

interface ClickableGroupFieldProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    required?: boolean;
    description?: string;
    concept?: Concept;
    options: Option[];
    control: Control<T>;
    className?: string;
    styles?: {
        button?: string;
        selected?: string;
    };
}

export function ClickableGroupField<T extends FieldValues = FieldValues>({
    name,
    label,
    required = false,
    description,
    concept,
    className,
    options,
    control,
    styles = {
        selected:
            "text-secondary border-2 border-secondary hover:bg-transparent hover:text-secondary hover:shadow-sm",
    },
}: ClickableGroupFieldProps<T>) {
    const { field } = useController({
        name,
        control,
        rules: { required },
    });

    const handleOnClick = (option: Option) => {
        if (Array.isArray(field.value)) {
            const newValue = field.value.includes(option.value)
                ? field.value.filter((v: string) => v !== option.value)
                : [...field.value, option.value];
            field.onChange(newValue);
        } else {
            field.onChange(option.value);
        }
    };

    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            concept={concept}
            control={control}
            render={() => (
                <div
                    className={cn(
                        "grid grid-cols-1 sm:grid-cols-2 gap-2",
                        className
                    )}
                >
                    {options.map((option) => {
                        const isSelected = Array.isArray(field.value)
                            ? field.value.includes(option.value)
                            : field.value === option.value;
                        return (
                            <Button
                                key={option.value}
                                type="button"
                                variant="outline"
                                disabled={option.disabled}
                                onClick={() => handleOnClick(option)}
                                className={cn(
                                    "group w-full hover:bg-muted hover:text-secondary",
                                    styles.button,
                                    isSelected && styles.selected
                                )}
                                aria-pressed={isSelected}
                            >
                                {option.label}
                            </Button>
                        );
                    })}
                </div>
            )}
        />
    );
}

export default ClickableGroupField;
