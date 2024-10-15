"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { FormFieldCustom, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
    value: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
}

interface RadioGroupFieldProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    options: Option[];
    required?: boolean;
    className?: string;
    description?: string;
    concept?: Concept;
    control?: Control<T>;
}

export function RadioGroupField<T extends FieldValues = FieldValues>({
    name,
    label,
    options,
    required = false,
    className,
    description,
    concept,
    control,
}: RadioGroupFieldProps<T>) {
    const { setValue, getValues } = useFormContext<T>();

    const handleOnValueChange = React.useCallback(
        (value: string) => {
            setValue(name, value as PathValue<T, Path<T>>, {
                shouldValidate: true,
            });
        },
        [name, setValue]
    );

    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            className="mx-0"
            control={control}
            render={() => {
                const value = getValues(name);
                return (
                    <RadioGroup
                        onValueChange={handleOnValueChange}
                        value={value}
                        className={className}
                    >
                        {options.map((option: Option) => (
                            <div
                                key={option.value}
                                className="flex items-center space-x-3 space-y-0 rounded-md border px-4 py-3.5"
                            >
                                <RadioGroupItem
                                    disabled={option.disabled}
                                    value={option.value}
                                    id={`${name}-${option.value}`}
                                />
                                <FormLabel
                                    concept={concept}
                                    required={option.required}
                                    htmlFor={`${name}-${option.value}`}
                                >
                                    {option.label}
                                </FormLabel>
                            </div>
                        ))}
                    </RadioGroup>
                );
            }}
        />
    );
}

export default RadioGroupField;
