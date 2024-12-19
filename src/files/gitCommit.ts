import { parseGitLog, vscode, exec, promisify, Commit } from "../imports";

const execAsync = promisify(exec);

export async function gitCommit(workFolder: string) {
    try {
        // Stage all changes
        await execAsync(`git add .`, { cwd: workFolder });

        // Check git status
        const { stdout: statusStdout } = await execAsync(`git status`, { cwd: workFolder });
        if (statusStdout.includes("nothing to commit, working tree clean")) {
            throw new Error("Nothing to commit. Working tree is clean.");
        }

        // Prompt for a commit message
        const commitMessage = await vscode.window.showInputBox({
            placeHolder: "Enter your commit message",
            prompt: "What changes have you made?",
        });

        if (!commitMessage) throw new Error("Commit cancelled. No message was provided.");

        // Commit the changes
        await execAsync(`git commit -m "${commitMessage}"`, { cwd: workFolder });

        // Get the most recent git commit log
        const { stdout: logStdout } = await execAsync(`git log -1 --name-status`, { cwd: workFolder });
        const parsedCommits = parseGitLog(logStdout);

        // Extract the latest commit (first commit in the parsed array)
        if (parsedCommits && parsedCommits.length === 0) throw new Error("Failed to get the latest commit.");

        const latestCommit: Commit = parsedCommits[0];

        return {
            success: true,
            commit: latestCommit,
            message: commitMessage,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            commit: null,
            message: null,
            error: (error as Error).message,
        };
    }
}
