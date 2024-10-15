"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Icon, type IconNames } from "@/components/icon";
import { FormFieldCustom } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type OptionValue = string | number | boolean;

type Option = {
    value: OptionValue;
    label: string;
    disabled?: boolean;
    icon?: IconNames;
    className?: string;
};

type SelectFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    className?: string;
    disabled?: boolean;
    options: Option[];
    concept?: Concept;
    control?: Control<T>;
    styles?: {
        content?: string;
        item?: string;
        option?: string;
    };
};

export function SelectField<T extends FieldValues = FieldValues>({
    name,
    label,
    placeholder = "Auswählen",
    required = false,
    description,
    options,
    className,
    disabled = false,
    concept,
    styles,
    control,
}: SelectFieldProps<T>) {
    const handleOnChange = (value: OptionValue): OptionValue => {
        let convertedValue: OptionValue = value;
        if (value === "true") convertedValue = true;
        else if (value === "false") convertedValue = false;
        else if (!isNaN(Number(value)) && typeof value === "number")
            convertedValue = Number(value);
        return convertedValue;
    };

    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            className={className}
            concept={concept}
            control={control}
            render={({ field }) => (
                <Select
                    onValueChange={(value) => {
                        field.onChange(handleOnChange(value));
                    }}
                    defaultValue={String(field.value)}
                >
                    <SelectTrigger disabled={disabled}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className={cn(styles?.content)}>
                        {options.map((option: Option) => (
                            <SelectItem
                                disabled={option.disabled}
                                key={String(option.value)}
                                value={String(option.value)}
                                className={cn(styles?.item)}
                            >
                                <div
                                    className={cn(
                                        "flex items-center",
                                        styles?.option,
                                        option?.className
                                    )}
                                >
                                    {option.icon && (
                                        <>
                                            <Icon
                                                name={option.icon}
                                                className="mr-2 size-4"
                                            />
                                            <span className="sr-only">
                                                {option.label}
                                            </span>
                                        </>
                                    )}
                                    <span>{option.label}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
}

export default SelectField;
