import { Command } from "commander";
import prompts from "prompts";
import { copyFormFields } from "../utils/copy-form-fields.js";
import { getConfig } from "../utils/get-config.js";
import { handleError } from "../utils/handle-error.js";
import { logger } from "../utils/logger.js";
import { addComponent } from "../utils/registry.js";

export const add = new Command()
    .name("add")
    .description("Add a component to your project")
    .argument("[components...]", "the components to add")
    .option("-y, --yes", "skip confirmation prompt.", true)
    .option("-o, --overwrite", "overwrite existing files.", false)
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .option("-a, --all", "add all available components", false)
    .option("-p, --path <path>", "the path to add the component to.")
    .option("-f, --form-fields", "add form field components")
    .action(async (components, opts) => {
        try {
            const config = await getConfig();
            if (!config) {
                logger.error("No configuration found. Run 'init' first.");
                process.exit(1);
            }

            if (opts.formFields) {
                await copyFormFields(config, opts.path);
                logger.success("Form field components added successfully.");
                return;
            }

            if (!components) {
                const answer = await prompts({
                    type: "select",
                    name: "component",
                    message: "Which component do you want to add?",
                    choices: [
                        { title: "Input Field", value: "input-field" },
                        { title: "Checkbox Field", value: "checkbox-field" },
                        {
                            title: "Radio Group Field",
                            value: "radio-group-field",
                        },
                        { title: "Select Field", value: "select-field" },
                    ],
                });
                components = answer.component;
            }

            await addComponent(components, config.componentsDir, opts.yes);
        } catch (error) {
            handleError(error);
        }
    });
