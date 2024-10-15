import fs from "fs-extra";
import path from "path";

export async function getPackageInfo() {
    const packageJsonPath = path.join(__dirname, "../../package.json");
    const packageJson = await fs.readJSON(packageJsonPath);
    return packageJson;
}
