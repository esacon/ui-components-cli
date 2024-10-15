"use client";

import { type Dispatch, type SetStateAction } from "react";
import { de } from "date-fns/locale";
import type { Matcher } from "react-day-picker";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
    DatePicker,
    DateRangePicker,
    type DateRange,
} from "@/components/ui/date-picker";
import { FormFieldCustom } from "@/components/ui/form";

const defaultTranslations = {
    cancel: "Abbrechen",
    apply: "Anwenden",
    start: "Start",
    end: "Ende",
    range: "Bereich",
} as const;

type DateValue = Date | undefined;
type DateRangeValue = DateRange | undefined;

type DateOnChange = ((value: DateValue) => void) | ((value: DateRange) => void);

type DateFieldProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    description?: string;
    className?: string;
    disabled?: boolean;
    isRange?: boolean;
    concept?: Concept;
    value?: DateValue | DateRangeValue;
    onChange?: Dispatch<SetStateAction<DateRange | undefined>> | DateOnChange;
    disabledDays?: Matcher | Matcher[] | undefined;
    control?: Control<T>;
    translations?: typeof defaultTranslations;
};

export function DateField<T extends FieldValues = FieldValues>({
    name,
    label,
    required = false,
    description,
    className,
    disabled = false,
    isRange = false,
    concept,
    value,
    onChange,
    disabledDays = { before: new Date() },
    control,
    translations = defaultTranslations,
}: DateFieldProps<T>) {
    const locale = de;

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
                <div className="mt-auto">
                    {isRange ? (
                        <DateRangePicker
                            value={(value as DateRangeValue) || field.value}
                            onChange={(newValue) => {
                                if (onChange) {
                                    (
                                        onChange as Dispatch<
                                            SetStateAction<
                                                DateRange | undefined
                                            >
                                        >
                                    )(newValue);
                                } else {
                                    field.onChange(newValue);
                                }
                            }}
                            disabled={disabled}
                            disabledDays={disabledDays}
                            locale={locale}
                            translations={translations}
                            aria-label={label || "Date range selection"}
                        />
                    ) : (
                        <DatePicker
                            value={(value as DateValue) || field.value}
                            onChange={(newValue) => {
                                if (onChange) {
                                    (onChange as (value: DateValue) => void)(
                                        newValue
                                    );
                                } else {
                                    field.onChange(newValue);
                                }
                            }}
                            disabled={disabled}
                            disabledDays={disabledDays}
                            locale={locale}
                            translations={translations}
                            aria-label={label || "Date selection"}
                        />
                    )}
                </div>
            )}
        />
    );
}

export default DateField;
