import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import { TSCONFIG_TEMPLATE } from "../templates/config.js";
import { copyFormFields } from "../utils/copy-form-fields.js";
import { Config, getConfig, writeConfig } from "../utils/get-config.js";
import { handleError } from "../utils/handle-error.js";
import { logger } from "../utils/logger.js";

async function promptForConfig(
    cwd: string,
    existingConfig: Config | null,
    skipPrompts: boolean
): Promise<Config> {
    if (skipPrompts && existingConfig) {
        return existingConfig;
    }

    const answers = await prompts([
        {
            type: "text",
            name: "componentsDir",
            message: "Where should components be created?",
            initial: existingConfig?.componentsDir || "src/components",
        },
        {
            type: "confirm",
            name: "useTypeScript",
            message: "Do you want to use TypeScript?",
            initial: existingConfig?.useTypeScript ?? true,
        },
        {
            type: "confirm",
            name: "formFields",
            message: "Do you want to include form field components?",
            initial: existingConfig?.formFields ?? false,
        },
    ]);

    return {
        componentsDir: answers.componentsDir,
        useTypeScript: answers.useTypeScript,
        formFields: answers.formFields,
    };
}

async function runInit(cwd: string, config: Config) {
    // Create components directory
    await fs.ensureDir(path.join(cwd, config.componentsDir));
    logger.success(`Created components directory: ${config.componentsDir}`);

    // Create tsconfig.json if using TypeScript
    if (config.useTypeScript) {
        const tsconfigPath = path.join(cwd, "tsconfig.json");
        if (!(await fs.pathExists(tsconfigPath))) {
            await fs.writeFile(tsconfigPath, TSCONFIG_TEMPLATE);
            logger.success("Created tsconfig.json");
        } else {
            logger.info("tsconfig.json already exists, skipping creation.");
        }
    }

    // Write the configuration file
    await writeConfig(config);
    logger.success("Configuration file created successfully!");

    if (config.formFields) {
        await copyFormFields(config);
        logger.success("Form field components added successfully.");
    }
}

export const init = new Command()
    .name("init")
    .description("initialize your project and install dependencies")
    .option("-y, --yes", "skip confirmation prompt.", false)
    .option("-d, --defaults", "use default configuration.", false)
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-f, --form-fields", "include form field components", false)
    .action(async (opts) => {
        try {
            const existingConfig = await getConfig();
            const config = await promptForConfig(
                opts.cwd,
                existingConfig,
                opts.yes || opts.defaults
            );

            if (opts.formFields) {
                config.formFields = true;
            }

            await runInit(opts.cwd, config);

            logger.info(
                "You can now start adding components using the 'add' command."
            );
        } catch (error) {
            handleError(error);
        }
    });
