import { Router } from "express";
import { spawn } from "node:child_process";

import {
  PUBLISH_BRANCH,
  PUBLISH_COMMIT_MESSAGE,
  PUBLISH_DEPLOY_SCRIPT,
  PUBLISH_GIT_ADD_PATHS,
  PUBLISH_REMOTE,
} from "../config.js";
import { requireAuth, requireOwner } from "../middleware/authenticate.js";

const router = Router();

type CommandResult = {
  command: string;
  stdout: string;
  stderr: string;
};

const runCommand = async (command: string, args: string[], cwd: string): Promise<CommandResult> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: process.platform === "win32",
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ command: `${command} ${args.join(" ")}`.trim(), stdout, stderr });
      } else {
        const error = new Error(
          `${command} ${args.join(" ")} exited with code ${code}\n${stderr || stdout}`,
        );
        reject(error);
      }
    });
  });

router.post("/", requireAuth, requireOwner, async (req, res) => {
  const results: CommandResult[] = [];
  const cwd = process.cwd();

  try {
    const addArgs = ["add", ...PUBLISH_GIT_ADD_PATHS];
    results.push(await runCommand("git", addArgs, cwd));

    const status = await runCommand("git", ["status", "--porcelain"], cwd);
    results.push(status);

    if (!status.stdout.trim()) {
      return res.json({
        committed: false,
        pushed: false,
        deployed: false,
        message: "No content changes detected.",
        logs: results,
      });
    }

    const commitMessage =
      typeof req.body?.message === "string" && req.body.message.trim().length > 0
        ? req.body.message.trim()
        : PUBLISH_COMMIT_MESSAGE;

    results.push(await runCommand("git", ["commit", "-m", commitMessage], cwd));
    results.push(await runCommand("git", ["push", PUBLISH_REMOTE, PUBLISH_BRANCH], cwd));

    if (PUBLISH_DEPLOY_SCRIPT) {
      const parts = PUBLISH_DEPLOY_SCRIPT.split(" ").filter((part) => part.trim().length > 0);
      const [deployCommand, ...rest] = parts;
      if (deployCommand) {
        results.push(await runCommand(deployCommand, rest, cwd));
      }
    }

    res.json({
      committed: true,
      pushed: true,
      deployed: Boolean(PUBLISH_DEPLOY_SCRIPT),
      message: "Content published successfully.",
      logs: results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to publish content.";
    res.status(500).json({
      committed: false,
      pushed: false,
      deployed: false,
      message,
      logs: results,
    });
  }
});

export default router;


