export const DAYTIME_PICKER_PRESETS = [
    { label: "Heute", dateRange: { from: new Date(), to: new Date() } },
    {
        label: "Vor 7 Tagen",
        dateRange: {
            from: new Date(new Date().setDate(new Date().getDate() - 7)),
            to: new Date(),
        },
    },
    {
        label: "Vor 30 Tagen",
        dateRange: {
            from: new Date(new Date().setDate(new Date().getDate() - 30)),
            to: new Date(),
        },
    },
    {
        label: "Vor 3 Monaten",
        dateRange: {
            from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
            to: new Date(),
        },
    },
    {
        label: "Vor 6 Monaten",
        dateRange: {
            from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            to: new Date(),
        },
    },
    {
        label: "Aktueller Monat",
        dateRange: { from: new Date(new Date().setDate(1)), to: new Date() },
    },
    {
        label: "Aktuelles Jahr",
        dateRange: {
            from: new Date(
                new Date().setFullYear(new Date().getFullYear(), 0, 1)
            ),
            to: new Date(),
        },
    },
];

export const FREQUENCY_INTERVALS = [
    { label: "Stündlich", value: "hourly" },
    { label: "Täglich", value: "daily" },
    { label: "Wöchentlich", value: "weekly" },
    { label: "Monatlich", value: "monthly" },
    { label: "Jährlich", value: "yearly" },
] as const satisfies {
    label: string;
    value: DateIntervals;
}[];

export const focusRing = [
    // Basis
    "outline outline-offset-2 outline-0 focus-visible:outline-2",
    // Umrissfarbe
    "outline-primary",
];

export const focusInput = [
    // Basis
    "focus:ring-2",
    // Ringfarbe
    "focus:ring-blue-200 focus:dark:ring-blue-700/30",
    // Rahmenfarbe
    "focus:border-blue-500 focus:dark:border-blue-700",
];

export const hasErrorInput = [
    // Basis
    "ring-2",
    // Rahmenfarbe
    "border-red-500 dark:border-red-700",
    // Ringfarbe
    "ring-red-200 dark:ring-red-700/30",
];
