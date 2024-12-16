import { vscode } from "./imports";

export function getWorkspacePath() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showWarningMessage("No workspace folder found.");
        return null;
    }
    return workspaceFolders[0].uri.fsPath;
}
