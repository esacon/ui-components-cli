"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldCustom } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

type SliderFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    description?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    defaultValue?: number;
    concept?: Concept;
    className?: string;
    control?: Control<T>;
};

export function SliderField<T extends FieldValues = FieldValues>({
    name,
    label,
    description,
    required = false,
    min = 0,
    max = 100,
    step = 1,
    defaultValue = 50,
    disabled = false,
    concept,
    className,
    control,
}: SliderFieldProps<T>) {
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
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    defaultValue={[field.value ?? defaultValue]}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="mt-2"
                />
            )}
        />
    );
}

export default SliderField;
