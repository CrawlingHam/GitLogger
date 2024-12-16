import { vscode, getWorkspacePath, createRepository } from "./imports";
import { initializeRepository } from "./initalizeRepository";

export async function activate(context: vscode.ExtensionContext) {
    
    // Get workspace
    const workFolder = getWorkspacePath();
    if(!workFolder) return vscode.window.showErrorMessage("No workspace folder found. Please open a folder.");

    // check for git init
    await initializeRepository(workFolder)



    // get token

    // get username

    // get file

    // git commit 

    // git log the commit

    // parse git log

    // format log

    // push to file

    // set interval every 30 minutes git commit and push to file
    


    // context.subscriptions.push(
    //     vscode.commands.registerCommand("extension.gitInit", async () => {
    //         const workspacePath = await getWorkspacePath();
    //         if (!workspacePath) return;

    //         // Initialize the repository (implement git init logic here)
    //         vscode.window.showInformationMessage("Git initialization is not yet implemented.");
    //     })
    // );
}

// git log --stat = shows file names and path + if added or removed code
// next: create a file inside the repo called task_log.md with the structure:
//  login.tsx(file name)            Fixed bug in login feature(commit message)             30 minutes ago(date committed)
// format and style

export function deactivate() {}
