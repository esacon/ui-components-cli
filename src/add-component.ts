import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

const components = {
    "file-uploader": {
        files: ["file-uploader.tsx"],
        dependencies: ["react-dropzone"],
    },
    "date-picker": {
        files: ["date-picker.tsx"],
        dependencies: ["date-fns"],
    },
    "input-field": {
        files: ["input-field.tsx"],
        dependencies: ["@/components/ui/form", "@/components/ui/input"],
    },
    "checkbox-field": {
        files: ["checkbox-field.tsx"],
        dependencies: ["@/components/ui/checkbox", "@/components/ui/form"],
    },
    "checkbox-group-field": {
        files: ["checkbox-group-field.tsx"],
        dependencies: ["@/components/ui/checkbox", "@/components/ui/form"],
    },
    "clickable-field": {
        files: ["clickable-field.tsx"],
        dependencies: ["@/components/ui/button", "@/components/ui/form"],
    },
    "clickable-group-field": {
        files: ["clickable-group-field.tsx"],
        dependencies: ["@/components/ui/button", "@/components/ui/form"],
    },
    "date-field": {
        files: ["date-field.tsx"],
        dependencies: ["@/components/ui/date-picker", "@/components/ui/form"],
    },
    "dropdown-field": {
        files: ["dropdown-field.tsx"],
        dependencies: ["@/components/ui/dropdown", "@/components/ui/form"],
    },
    "file-field": {
        files: ["file-field.tsx"],
        dependencies: ["@/components/file-uploader", "@/components/ui/form"],
    },
    "grouped-select-field": {
        files: ["grouped-select-field.tsx"],
        dependencies: [
            "@/components/ui/select",
            "@/components/ui/form",
            "@/components/icon",
        ],
    },
    "multiselect-field": {
        files: ["multiselect-field.tsx"],
        dependencies: [
            "@/components/ui/dropdown-multiple",
            "@/components/ui/form",
        ],
    },
    "radio-group-field": {
        files: ["radio-group-field.tsx"],
        dependencies: ["@/components/ui/radio-group", "@/components/ui/form"],
    },
    "select-field": {
        files: ["select-field.tsx"],
        dependencies: [
            "@/components/ui/select",
            "@/components/ui/form",
            "@/components/icon",
        ],
    },
    "slider-field": {
        files: ["slider-field.tsx"],
        dependencies: ["@/components/ui/slider", "@/components/ui/form"],
    },
    "switch-field": {
        files: ["switch-field.tsx"],
        dependencies: ["@/components/ui/switch", "@/components/ui/form"],
    },
    "text-area-field": {
        files: ["text-area-field.tsx"],
        dependencies: ["@/components/ui/textarea", "@/components/ui/form"],
    },
};

export async function addComponent(
    componentName: string,
    customPath = "./components"
) {
    const component = components[componentName as keyof typeof components];
    if (!component) {
        console.error(chalk.red(`Component "${componentName}" not found.`));
        return;
    }

    const spinner = ora(`Adding ${componentName} component`).start();

    try {
        const config = await fs.readJSON(
            path.join(process.cwd(), "form-components.config.js")
        );
        const componentsDir = path.join(
            process.cwd(),
            config.aliases.components || customPath
        );
        await fs.ensureDir(componentsDir);

        // Copy component files
        for (const file of component.files) {
            const sourcePath = path.join(__dirname, "..", "components", file);
            const destPath = path.join(componentsDir, file);
            await fs.copy(sourcePath, destPath);
        }

        spinner.succeed(
            chalk.green(`Added ${componentName} to ${componentsDir}`)
        );

        // Log dependencies that need to be installed
        console.log(
            chalk.yellow(
                "\nMake sure you have the following dependencies installed:"
            )
        );
        component.dependencies.forEach((dep) => {
            console.log(chalk.cyan(`- ${dep}`));
        });

        console.log(chalk.green("\nComponent added successfully!"));
    } catch (error) {
        spinner.fail(chalk.red(`Failed to add ${componentName} component`));
        console.error(error);
    }
}
