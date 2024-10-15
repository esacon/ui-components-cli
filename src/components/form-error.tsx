import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    children?: React.ReactNode;
    message?: string;
    className?: string;
}

export const FormError = ({
    children,
    className,
    message = "Es ist ein Fehler aufgetreten",
}: FormErrorProps) => {
    return (
        <div className="my-4 flex flex-col gap-x-2 space-y-4 rounded-md border border-error bg-red-50/60 p-3 text-sm text-destructive">
            <div className="inline-flex w-full items-center gap-x-2 font-semibold">
                <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                {message}
            </div>
            {children ? <div className={className}>{children}</div> : null}
        </div>
    );
};
