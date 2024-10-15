import { readdir } from "fs/promises";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function listComponents(): Promise<string[]> {
    const componentsDir = join(__dirname, "..", "components");
    try {
        const files = await readdir(componentsDir);
        return files
            .filter((file) => file.endsWith(".tsx"))
            .map((file) => basename(file, ".tsx"));
    } catch (error) {
        console.error("Error reading components directory:", error);
        return [];
    }
}
