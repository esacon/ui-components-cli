"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormFieldCustom, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    description?: string;
    concept?: Concept;
}

export function CheckboxField<T extends FieldValues>({
    name,
    label,
    control,
    required = false,
    disabled = false,
    className,
    description,
    concept,
}: CheckboxFieldProps<T>) {
    const { setValue, getValues } = useFormContext<T>();

    const handleCheckedChange = React.useCallback(
        (checked: boolean) => {
            setValue(name, checked as PathValue<T, Path<T>>, {
                shouldValidate: true,
            });
        },
        [name, setValue]
    );

    return (
        <FormFieldCustom
            control={control}
            name={name}
            className={cn(
                "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
                className
            )}
            render={() => {
                const isChecked = getValues(name) as boolean;
                return (
                    <>
                        <Checkbox
                            id={name}
                            checked={isChecked}
                            disabled={disabled}
                            onCheckedChange={handleCheckedChange}
                        />
                        <div className="max-w-full space-y-1.5 leading-none">
                            {label && (
                                <FormLabel
                                    concept={concept}
                                    required={required}
                                    htmlFor={name}
                                >
                                    {label}
                                </FormLabel>
                            )}
                            {description && (
                                <p className="text-xs text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                    </>
                );
            }}
        />
    );
}

export default CheckboxField;
