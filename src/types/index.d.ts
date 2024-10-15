type DateIntervals = "hourly" | "daily" | "weekly" | "monthly" | "yearly";

type Concept = {
    title?: string;
    description: string;
    additionalInfo?: string;
    className?: string;
    sideOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
};
