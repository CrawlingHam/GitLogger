import { resetCommitLogging } from "../imports";
import { vscode } from "../imports";

export async function ChangeInterval(intervalHandle: NodeJS.Timeout | null) {
    const input = await promptUser();

    if (typeof input !== "undefined") {
        const interval = parseInt(input, 10);

        // Update the configuration with the new interval
        await vscode.workspace.getConfiguration().update("codeTracking.commitInterval", interval, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Commit interval updated to ${interval} minute(s).`);
        resetCommitLogging(interval, intervalHandle);
    }
}
async function promptUser() {
    const input = await vscode.window.showInputBox({
        prompt: "Enter the new interval (in minutes) for saving commits:",
        validateInput: (value) => {
            const number = parseInt(value, 10);
            if (isNaN(number) || number <= 0) {
                return "Please enter a valid positive number.";
            }
            return null;
        },
    });
    return input;
}
