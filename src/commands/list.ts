import { Command } from "commander";
import { logger } from "../utils/logger.js";
import { listComponents } from "../utils/registry.js";

export const list = new Command()
    .name("list")
    .description("List all available components")
    .action(async () => {
        const components = await listComponents();
        logger.info("Available components:");
        components.forEach((component) => {
            logger.info(`- ${component}`);
        });
    });
