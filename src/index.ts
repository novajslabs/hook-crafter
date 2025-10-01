#!/usr/bin/env node
import { Command } from "commander";
import { copy } from "fs-extra";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import { logger } from "@/src/utils/logger";
import { updatePackageName } from "@/src/utils/package-actions";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const detectPackageManager = (): string => {
  const userAgent = process.env.npm_config_user_agent;

  if (!userAgent) {
    return "npm";
  }

  if (userAgent.startsWith("yarn")) {
    return "yarn";
  } else if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  } else if (userAgent.startsWith("bun")) {
    return "bun";
  }

  return "npm";
};

const getInstallCommand = (
  packageManager: string,
  projectPath: string
): string => {
  const commands: Record<string, string> = {
    npm: `cd ${projectPath} && npm install`,
    yarn: `cd ${projectPath} && yarn`,
    pnpm: `cd ${projectPath} && pnpm install`,
    bun: `cd ${projectPath} && bun install`,
  };

  return commands[packageManager] || commands.npm;
};

async function main() {
  const program = new Command()
    .name("create-hook-crafter")
    .description("Set up your React hook library in seconds")
    .action(async () => {
      const { path }: { path: string } = await prompts({
        type: "text",
        name: "path",
        message: "Project name:",
        instructions: false,
      });

      if (!path) {
        logger.error("\nProject name is required. Exiting.");
        process.exit(1);
      }

      const __dirname = dirname(fileURLToPath(import.meta.url));
      const templatePath = resolve(__dirname, "../template");
      const destinationPath = resolve(process.cwd(), `${path}`);
      const pathSplitted = path.split("/");
      const projectName = pathSplitted[pathSplitted.length - 1];

      try {
        await copy(templatePath, destinationPath);
      } catch (e) {
        logger.error("Error copying template. Exiting.");
        process.exit(1);
      }

      updatePackageName(projectName, destinationPath);

      const packageManager = detectPackageManager();
      const installCommand = getInstallCommand(packageManager, path);

      logger.success("\nProject created successfully.");
      logger.msg(`\nNext steps:\n${installCommand}`);
      logger.msg(
        "\n🙏 Support my work and help keep Hook Crafter alive! \n\n☕ Buy me a coffee: https://ko-fi.com/dlcastillop \n🛒 More developer tools: https://patreon.com/dlcastillop/shop"
      );
    });

  program.parse();
}

main();
