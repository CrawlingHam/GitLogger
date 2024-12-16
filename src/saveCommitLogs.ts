import { exec, fs, path, vscode, getGitHubUsername } from "./imports";

export function saveCommitLogs(commitLogs: { date: string; message: string; hash: string }[], workspacePath: string) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const filteredLogs = commitLogs.filter((commit) => {
        const commitDate = new Date(commit.date);
        return commitDate.toDateString() === today.toDateString() || commitDate.toDateString() === yesterday.toDateString();
    });

    const logFilePath = path.join(workspacePath, "gitCommitLogs.txt");
    const logContent = filteredLogs.map((commit) => `${commit.date} - ${commit.hash} ${commit.message}`).join("\n");

    fs.writeFile(logFilePath, logContent, (err) => {
        if (err) {
            vscode.window.showErrorMessage("Failed to save commit logs to file.");
            return;
        }
        vscode.window.showInformationMessage(`Commit logs saved to ${logFilePath}`);
    });
}
