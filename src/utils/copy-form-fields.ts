import { promises as fs } from "fs";
import path from "path";
import { Config } from "./get-config.js";

const FORM_FIELDS_DIR = path.join(__dirname, "..", "components", "form-fields");

export async function copyFormFields(config: Config, targetPath?: string) {
    const componentsPath = targetPath
        ? path.resolve(config.componentsDir, targetPath)
        : config.componentsDir;

    const formFieldsPath = path.join(componentsPath, "form-fields");

    // Create the form-fields directory if it doesn't exist
    await fs.mkdir(formFieldsPath, { recursive: true });

    // Read all files from the form-fields directory
    const files = await fs.readdir(FORM_FIELDS_DIR);

    for (const file of files) {
        const sourcePath = path.join(FORM_FIELDS_DIR, file);
        const targetPath = path.join(formFieldsPath, file);

        // Copy each file to the target directory
        await fs.copyFile(sourcePath, targetPath);
    }
}
