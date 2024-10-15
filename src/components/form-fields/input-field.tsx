"use client";

import React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldCustom } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type InputType =
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "time";

interface BaseInputForm<T extends FieldValues = FieldValues>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "name"> {
    name: Path<T>;
    label?: string;
    control?: Control<T>;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    description?: string;
    concept?: Concept;
    className?: string;
}

interface TextInputForm<T extends FieldValues = FieldValues>
    extends BaseInputForm<T> {
    type?: Exclude<InputType, "number">;
    pattern?: string;
}

interface NumberInputForm<T extends FieldValues = FieldValues>
    extends BaseInputForm<T> {
    type: "number";
    min?: number;
    max?: number;
}

type InputForm<T extends FieldValues = FieldValues> =
    | TextInputForm<T>
    | NumberInputForm<T>;

export function InputField<T extends FieldValues>({
    name,
    label,
    placeholder = "",
    required = false,
    disabled = false,
    className,
    type = "text",
    description,
    concept,
    control,
    ...props
}: InputForm<T>) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: any
    ) => {
        if (type === "number") {
            const value = e.target.value
                ? parseInt(e.target.value, 10)
                : undefined;
            const { min, max } = props as NumberInputForm<T>;
            if (min !== undefined && value !== undefined && value < min) return;
            if (max !== undefined && value !== undefined && value > max) return;
            field.onChange(value);
        } else {
            const { pattern } = props as TextInputForm<T>;
            if (pattern && !new RegExp(pattern).test(e.target.value)) return;
            field.onChange(e.target.value);
        }
    };

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
                <Input
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type}
                    {...field}
                    {...props}
                    onChange={(e) => handleChange(e, field)}
                />
            )}
        />
    );
}

export default InputField;
