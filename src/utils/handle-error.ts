import { logger } from "./logger.js";

export function handleError(error: unknown): void {
    if (error instanceof Error) {
        logger.error(error.message);
    } else {
        logger.error("An unknown error occurred");
    }
    process.exit(1);
}
