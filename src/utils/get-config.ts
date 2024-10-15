import { cosmiconfig } from "cosmiconfig";
import fs from "fs-extra";
import path from "path";
import { z } from "zod";

export const rawConfigSchema = z
    .object({
        componentsDir: z.string(),
        useTypeScript: z.boolean(),
        formFields: z.boolean().default(false),
    })
    .strict();

export type Config = z.infer<typeof rawConfigSchema>;

const explorer = cosmiconfig("form-components");

export async function getConfig(): Promise<Config | null> {
    try {
        const result = await explorer.search();
        if (!result) {
            return null;
        }
        return rawConfigSchema.parse(result.config);
    } catch (error) {
        throw new Error("Invalid configuration found.");
    }
}

export async function writeConfig(config: Config): Promise<void> {
    const configPath = path.join(process.cwd(), ".form-componentsrc.json");
    await fs.writeJSON(configPath, config, { spaces: 2 });
}
