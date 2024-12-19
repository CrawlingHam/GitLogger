import { ChangeInterval, LogCommitIfNotInProgress, initializeCommitLogging, vscode } from "./imports";

let intervalHandle: NodeJS.Timeout | null = null;

export async function activate(context: vscode.ExtensionContext) {
    // Fetch the default interval from settings
    const config = vscode.workspace.getConfiguration("codeTracking");
    const defaultIntervalMinutes = config.get<number>("commitInterval", 1);

    // Initalize interval
    initializeCommitLogging(defaultIntervalMinutes, intervalHandle);

    context.subscriptions.push(
        vscode.commands.registerCommand("extension.LogCommit", async () => {
            await LogCommitIfNotInProgress();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("extension.ChangeInterval", async () => {
            await ChangeInterval(intervalHandle);
        })
    );
}

export function deactivate() {
    if (intervalHandle) {
        clearInterval(intervalHandle);
        intervalHandle = null;
    }
}
