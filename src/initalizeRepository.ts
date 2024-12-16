import { promisify } from "util";
import { exec, vscode } from "./imports";
const execAsync = promisify(exec);

export async function initializeRepository(workFolder: string) {
    const initalize = await promptUser();

    // Run 'git init' command
    if (initalize) {
        try {
            const { stdout } = await execAsync("git init", { cwd: workFolder });
            vscode.window.showInformationMessage("Git repository initialized successfully.");
            console.log(stdout);
            return { success: true, error: null };
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to initialize Git repository: ${(error as Error).message}`);
            return { success: false, error: (error as Error).message };
        }
    }
    return { success: false, error: null };
}

async function promptUser() {
    const choice = await vscode.window.showInformationMessage(
        "No Git repository found. Do you want to initialize one?",
        { modal: true },
        "Yes, initialize"
    );
    // const choice = await vscode.window.showInputBox(["Yes, initialize", "No, cancel"], {
    //     placeHolder: "No Git repository found. Do you want to initialize one?",
    // });

    if (choice !== "Yes, initialize") {
        vscode.window.showInformationMessage("Initialization cancelled.");
        return false;
    }

    return true;
}
