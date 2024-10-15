"use client";

import { useFormContext } from "react-hook-form";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormFieldCustom, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Option = {
    value: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
};

interface CheckboxGroupFieldProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    options: Option[];
    required?: boolean;
    className?: string;
    description?: string;
    concept?: Concept;
    control?: Control<T>;
}

export function CheckboxGroupField<T extends FieldValues>({
    name,
    label,
    options,
    required = false,
    className,
    description,
    concept,
    control,
}: CheckboxGroupFieldProps<T>) {
    const { setValue, getValues } = useFormContext<T>();

    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            className="mx-0"
            control={control}
            render={() => {
                const values = (getValues(name) as string[]) || [];
                return (
                    <div className={cn(className)}>
                        {options.map((option: Option) => (
                            <div
                                key={option.value}
                                className="mt-1 flex flex-row items-start space-x-3 space-y-0 rounded-md border px-4 py-3.5"
                            >
                                <Checkbox
                                    id={`${name}-${option.value}`}
                                    disabled={option.disabled}
                                    checked={values.includes(option.value)}
                                    onCheckedChange={(checked) => {
                                        const newValues = checked
                                            ? [...values, option.value]
                                            : values.filter(
                                                  (v: string) =>
                                                      v !== option.value
                                              );
                                        setValue(
                                            name,
                                            newValues as PathValue<T, Path<T>>,
                                            {
                                                shouldValidate: true,
                                            }
                                        );
                                    }}
                                />
                                <div className="space-y-1 leading-none">
                                    <FormLabel
                                        concept={concept}
                                        required={option.required ?? false}
                                        htmlFor={`${name}-${option.value}`}
                                    >
                                        {option.label}
                                    </FormLabel>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }}
        />
    );
}
