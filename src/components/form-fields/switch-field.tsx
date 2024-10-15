"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { FormFieldCustom, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SwitchFieldProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    description?: string;
    concept?: Concept;
    className?: string;
    control?: Control<T>;
}

export function SwitchField<T extends FieldValues = FieldValues>({
    name,
    label,
    required = false,
    disabled = false,
    description,
    concept,
    className,
    control,
}: SwitchFieldProps<T>) {
    return (
        <FormFieldCustom
            name={name}
            required={required}
            className={cn(
                "flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4",
                className
            )}
            control={control}
            render={({ field }) => (
                <>
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
                    <Switch
                        disabled={disabled}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="flex-shrink-0"
                    />
                </>
            )}
        />
    );
}

export default SwitchField;
