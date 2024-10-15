import { execSync } from "child_process";

export function getPackageManager(): "npm" | "yarn" | "pnpm" {
    try {
        execSync("yarn --version", { stdio: "ignore" });
        return "yarn";
    } catch {
        try {
            execSync("pnpm --version", { stdio: "ignore" });
            return "pnpm";
        } catch {
            return "npm";
        }
    }
}
