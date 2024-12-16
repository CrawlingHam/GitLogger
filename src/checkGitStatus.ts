import { exec, vscode, logProblem, runGitLog, getWorkspacePath } from "./imports";

export async function checkGitStatus() {
    const workspacePath = await getWorkspacePath();
    if (!workspacePath) return;

    // Run 'git status'
    exec("git status", { cwd: workspacePath }, (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage("Git status failed to execute. Make sure Git is installed and initialized in this project.");
            logProblem("Git status error", stderr || error.message);
            return;
        }

        // Analyze the status output
        const gitStatus = stdout;

        if (gitStatus.includes("Your branch is ahead")) {
            vscode.window.showWarningMessage("Your branch is ahead of the remote. Consider pushing your changes.");
            logProblem("Branch ahead of remote", "Push your changes to keep the branch in sync.");
        }

        if (gitStatus.includes("Your branch is behind")) {
            vscode.window.showWarningMessage("Your branch is behind the remote. Consider pulling changes.");
            logProblem("Branch behind remote", "Pull changes to update your branch.");
        }

        if (gitStatus.includes("Untracked files")) {
            vscode.window.showWarningMessage("There are untracked files in your repository.");
            logProblem("Untracked files detected", "Add or ignore untracked files to keep the repository clean.");
        }

        if (gitStatus.includes("Changes not staged for commit")) {
            vscode.window.showWarningMessage("There are unstaged changes in your repository.");
            logProblem("Unstaged changes detected", "Stage your changes before committing.");
        }

        if (gitStatus.includes("Changes to be committed")) {
            vscode.window.showInformationMessage("You have changes ready to commit.");
            logProblem("Changes ready to commit", "Commit your staged changes.");
        }

        // If branches are in sync, run git log
        if (!gitStatus.includes("Your branch is ahead") && !gitStatus.includes("Your branch is behind")) {
            // runGitLog(workspacePath, repoName);
        }
    });
}
