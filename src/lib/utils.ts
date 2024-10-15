import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatBytes(
    bytes: number,
    opts: {
        decimals?: number;
        sizeType?: "accurate" | "normal";
    } = {}
) {
    const { decimals = 0, sizeType = "normal" } = opts;

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
        sizeType === "accurate"
            ? (accurateSizes[i] ?? "Bytest")
            : (sizes[i] ?? "Bytes")
    }`;
}

export const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const splitName = name.split(" ");
    const initials = splitName.reduce((acc, curr) => {
        if (curr) acc += curr[0].toUpperCase();
        return acc;
    }, "");
    return initials;
};
