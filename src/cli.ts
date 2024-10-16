import { Command } from "commander";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";
import { getPackageInfo } from "./utils/get-package-info.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
    const packageInfo = await getPackageInfo();

    const program = new Command()
        .name("form-components")
        .description("Add form components to your project")
        .version(
            packageInfo.version || "0.1.25",
            "-v, --version",
            "display the version number"
        );

    program.addCommand(init);
    program.addCommand(add);
    program.addCommand(list);

    program.parse(process.argv);
}

main();
