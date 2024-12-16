import { exec, vscode, parseGitLog, saveCommitLogs, formatLogsAsMarkdown, createFileInRepo, updateCodeTracking } from "./imports";

export async function runGitLog(workspacePath: string, repoName: string, username: string, token: string) {
    exec("git log --stat", { cwd: workspacePath }, async (error, stdout, stderr) => {
        if (error) {
            if (stderr.includes("fatal: your current branch 'master' does not have any commits yet")) {
                vscode.window.showInformationMessage("No commits found in the current Git repository. Please make an initial commit.");
            } else {
                vscode.window.showErrorMessage("Git log failed to execute: " + stderr);
            }
            return;
        }

        try {
            // Parse the git log output
            const commitLogs = parseGitLog(stdout);

            // Format logs into Markdown
            const markdownContent = formatLogsAsMarkdown(commitLogs, username, repoName);

            // Create or update the code-tracking.md file in the GitHub repository
            const fileName = "code-tracking.md";
            const result = await updateCodeTracking(repoName, username, token);
            // const result = await updateCodeTracking(repoName, token, username, fileName, markdownContent);

            // if (result.success) {
            //     if (result.content_URL) {
            //         vscode.window.showInformationMessage(`Code tracking file updated successfully: ${result.content_URL}`);
            //     } else {
            //         vscode.window.showInformationMessage(result.message || "Code tracking file updated.");
            //     }
            // } else {
            //     vscode.window.showErrorMessage(`Failed to update code tracking file: ${result.error}`);
            // }
        } catch (err) {
            vscode.window.showErrorMessage(`Unexpected error while processing git logs: ${(err as Error).message}`);
        }
    });
}
