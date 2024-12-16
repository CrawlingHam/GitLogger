import { vscode, exec, parseGitLog, formatLogsAsMarkdown, createFileInRepo } from "./imports";
export function updateCodeTracking(repoName: string, username: string, token: string): void {
    const fileName = "code-tracking.md";

    exec("git log --stat", async (error, stdout, stderr) => {
        if (error) {
            console.error("Error running git log --stat:", error.message);
            return;
        }

        if (stderr) {
            console.error("Git log stderr:", stderr);
            return;
        }

        try {
            // Parse and format logs
            const logs = parseGitLog(stdout);
            const markdownContent = formatLogsAsMarkdown(logs, username, repoName);

            // Use createFileInRepo to handle file creation/updating
            const result = await createFileInRepo(repoName, token, username, fileName, markdownContent);

            if (result.success) {
                if (result.content_URL) {
                    vscode.window.showInformationMessage(`Code tracking file updated successfully: ${result.content_URL}`);
                } else {
                    vscode.window.showInformationMessage(result.message || "Code tracking file updated.");
                }
            } else {
                vscode.window.showErrorMessage(`Failed to update code tracking file: ${result.error}`);
            }
        } catch (err) {
            vscode.window.showErrorMessage(`Unexpected error: ${(err as Error).message}`);
        }
    });
}
