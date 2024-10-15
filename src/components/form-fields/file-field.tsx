"use client";

import React from "react";
import { type DropzoneProps } from "react-dropzone";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FileUploader } from "@/components/file-uploader";
import { FormFieldCustom } from "@/components/ui/form";

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB

interface FileFieldProps<T extends FieldValues = FieldValues>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
    name: Path<T>;
    label: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    maxFileCount?: number;
    maxSize?: number;
    concept?: Concept;
    accept?: DropzoneProps["accept"];
    multiple?: boolean;
    onUpload?: (files: File[]) => Promise<void>;
    progresses?: Record<string, number>;
    control?: Control<T>;
}

export function FileField<T extends FieldValues = FieldValues>({
    name,
    label,
    description,
    required = false,
    disabled = false,
    className,
    maxFileCount = 1,
    maxSize = MAX_FILE_SIZE,
    concept,
    accept = {
        "image/*": [],
        "application/pdf": [],
    },
    multiple = false,
    onUpload,
    progresses,
    control,
    ...props
}: FileFieldProps<T>) {
    return (
        <FormFieldCustom
            name={name}
            label={label}
            description={description}
            required={required}
            concept={concept}
            className="mx-0"
            control={control}
            render={({ field }) => (
                <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={disabled}
                    maxFileCount={maxFileCount}
                    maxSize={maxSize}
                    accept={accept}
                    multiple={multiple}
                    onUpload={onUpload}
                    progresses={progresses}
                    className={className}
                    {...props}
                />
            )}
        />
    );
}

export default FileField;
