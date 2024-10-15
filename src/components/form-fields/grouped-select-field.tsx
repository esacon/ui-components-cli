"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Icon, type IconNames } from "@/components/icon";
import { FormFieldCustom } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type OptionValue = string | number | boolean;

type Option = {
    value: OptionValue;
    label: string;
    disabled?: boolean;
    icon?: IconNames;
};

type OptionGroup = {
    label: string;
    options: Option[];
};

type GroupedSelectFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    className?: string;
    disabled?: boolean;
    groups: OptionGroup[];
    concept?: Concept;
    control?: Control<T>;
};

export function GroupedSelectField<T extends FieldValues = FieldValues>({
    name,
    label,
    placeholder = "Auswählen",
    required = false,
    description,
    groups,
    className,
    disabled = false,
    concept,
    control,
}: GroupedSelectFieldProps<T>) {
    const handleOnChange = (value: OptionValue): OptionValue => {
        let convertedValue: OptionValue = value;
        if (value === "true") convertedValue = true;
        else if (value === "false") convertedValue = false;
        else if (!isNaN(Number(value))) convertedValue = Number(value);
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
                    <SelectContent>
                        {groups.map((group, index) => (
                            <SelectGroup key={index}>
                                <SelectLabel>{group.label}</SelectLabel>
                                {group.options.map((option: Option) => (
                                    <SelectItem
                                        disabled={option.disabled}
                                        key={String(option.value)}
                                        value={String(option.value)}
                                    >
                                        <div className="flex items-center">
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
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>
            )}
        />
    );
}

export default GroupedSelectField;
