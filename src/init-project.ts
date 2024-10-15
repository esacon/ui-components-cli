import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

export async function initProject() {
    const spinner = ora("Initializing project").start();

    try {
        const configPath = path.join(
            process.cwd(),
            "form-components.config.js"
        );

        if (await fs.pathExists(configPath)) {
            spinner.warn(
                chalk.yellow(
                    "form-components.config.js already exists. Skipping initialization."
                )
            );
            return;
        }

        const configContent = `module.exports = {
  style: 'default',
  typescript: true,
  tailwind: {
    config: 'tailwind.config.js',
    css: 'app/globals.css',
    baseColor: 'slate',
    cssVariables: true
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    hooks: '@/hooks'
  }
};`;

        await fs.writeFile(configPath, configContent);

        // Create necessary directories
        const directories = ["components", "lib", "hooks"];
        for (const dir of directories) {
            const dirPath = path.join(process.cwd(), dir);
            await fs.ensureDir(dirPath);
            spinner.info(chalk.blue(`Created ${dir} directory`));
        }

        // Create utils.ts file
        const utilsPath = path.join(process.cwd(), "lib", "utils.ts");
        if (!(await fs.pathExists(utilsPath))) {
            const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(
    bytes: number,
    opts: {
        decimals?: number;
        sizeType?: "accurate" | "normal";
    } = {}
): string {
    const { decimals = 0, sizeType = "normal" } = opts;

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return \`\${(bytes / Math.pow(1024, i)).toFixed(decimals)} \${
        sizeType === "accurate"
            ? (accurateSizes[i] ?? "Bytes")
            : (sizes[i] ?? "Bytes")
    }\`;
}

export const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const splitName = name.split(" ");
    const initials = splitName.reduce((acc, curr) => {
        if (curr) acc += curr[0].toUpperCase();
        return acc;
    }, "");
    return initials;
};`;
            await fs.writeFile(utilsPath, utilsContent);
            spinner.info(chalk.blue("Created lib/utils.ts"));
        }

        // Create hook files
        const hooksToCreate = [
            {
                name: "use-callback-ref.ts",
                content: `import * as React from "react";

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
function useCallbackRef<T extends (...args: any[]) => unknown>(
    callback: T | undefined
): T {
    const callbackRef = React.useRef(callback);

    React.useEffect(() => {
        callbackRef.current = callback;
    });

    return React.useMemo(
        () => ((...args: any[]) => callbackRef.current?.(...args)) as T,
        []
    );
}

export { useCallbackRef };`,
            },
            {
                name: "use-controllable-state.ts",
                content: `import * as React from "react";
import { useCallbackRef } from "./use-callback-ref";

type UseControllableStateParams<T> = {
    prop?: T | undefined;
    defaultProp?: T | undefined;
    onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
    prop,
    defaultProp,
    onChange = () => {},
}: UseControllableStateParams<T>) {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
        defaultProp,
        onChange,
    });
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;
    const handleChange = useCallbackRef(onChange);

    const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
        React.useCallback(
            (nextValue) => {
                if (isControlled) {
                    const setter = nextValue as SetStateFn<T>;
                    const value =
                        typeof nextValue === "function"
                            ? setter(prop)
                            : nextValue;
                    if (value !== prop) handleChange(value as T);
                } else {
                    setUncontrolledProp(nextValue);
                }
            },
            [isControlled, prop, setUncontrolledProp, handleChange]
        );

    return [value, setValue] as const;
}

function useUncontrolledState<T>({
    defaultProp,
    onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
    const uncontrolledState = React.useState<T | undefined>(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = React.useRef(value);
    const handleChange = useCallbackRef(onChange);

    React.useEffect(() => {
        if (prevValueRef.current !== value) {
            handleChange(value as T);
            prevValueRef.current = value;
        }
    }, [value, prevValueRef, handleChange]);

    return uncontrolledState;
}

export { useControllableState };`,
            },
        ];

        for (const hook of hooksToCreate) {
            const hookPath = path.join(process.cwd(), "hooks", hook.name);
            if (!(await fs.pathExists(hookPath))) {
                await fs.writeFile(hookPath, hook.content);
                spinner.info(chalk.blue(`Created hooks/${hook.name}`));
            }
        }

        spinner.succeed(
            chalk.green(
                "Initialization complete. You can now start adding components."
            )
        );
    } catch (error) {
        spinner.fail(chalk.red("Failed to initialize project"));
        console.error(error);
    }
}
