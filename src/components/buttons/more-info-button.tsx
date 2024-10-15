import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MoreInfoButtonProps {
    className?: string;
    concept: Concept;
}

export function MoreInfoButton({ className, concept }: MoreInfoButtonProps) {
    const { title, description, additionalInfo, side, sideOffset, align } =
        concept;

    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 p-1 text-muted-foreground"
                    aria-label="Mehr Informationen"
                >
                    <Icon name="questionMark" className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side={side}
                sideOffset={sideOffset}
                align={align}
                className={cn("max-w-[280px] p-4 z-50", className)}
            >
                <div className="flex flex-col gap-2">
                    {!!title && (
                        <div className="flex items-center gap-x-2">
                            <Icon name="book" className="h-4 w-4" />
                            <h4 className="text-sm font-semibold text-foreground">
                                {title}
                            </h4>
                        </div>
                    )}
                    <p className="text-muted-foreground text-sm">
                        {description}
                    </p>
                    {!!additionalInfo && (
                        <p className="text-muted-foreground text-xs">
                            <span className="font-semibold">Hinweis:</span>{" "}
                            {additionalInfo}
                        </p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
