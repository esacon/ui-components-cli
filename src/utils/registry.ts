import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { getConfig } from "./get-config.js";
import { logger } from "./logger.js";

const components = [
    "input-field",
    "checkbox-field",
    "radio-group-field",
    "select-field",
];

export async function addComponent(
    component: string,
    outputDir: string,
    skipPrompt: boolean
): Promise<void> {
    if (!components.includes(component)) {
        logger.error(`Component "${component}" not found.`);
        return;
    }

    const spinner = ora(`Adding ${component}`).start();

    try {
        const config = await getConfig();
        if (!config) {
            throw new Error("Configuration not found. Run 'init' first.");
        }

        const sourceDir = path.join(__dirname, "../components");
        const sourcePath = path.join(sourceDir, `${component}.tsx`);
        const targetPath = path.join(
            process.cwd(),
            outputDir,
            `${component}.${config.useTypeScript ? "tsx" : "jsx"}`
        );

        await fs.ensureDir(path.dirname(targetPath));

        let content = await fs.readFile(sourcePath, "utf-8");

        if (!config.useTypeScript) {
            // Remove TypeScript-specific syntax
            content = content.replace(/: React\.FC<.*>/g, "");
            content = content.replace(/: .*(?=(\) =>|\) {))/g, "");
            content = content.replace(/: [A-Z][a-zA-Z]+/g, "");
        }

        await fs.writeFile(targetPath, content);

        spinner.succeed(`Added ${component} to ${outputDir}`);
        logger.info(`You can now import the component like this:`);
        logger.info(
            `import { ${component
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("")} } from './${outputDir}/${component}';`
        );
    } catch (error) {
        spinner.fail(`Failed to add ${component}`);
        throw error;
    }
}

export async function listComponents(): Promise<string[]> {
    return components;
}
