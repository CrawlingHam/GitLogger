import { vscode, getGitHubAccessToken, createGitHubRepo, getWorkspacePath, isGitInitialized } from "./imports";

export async function createRepository() {
    const workspacePath = await getWorkspacePath();
    if (!workspacePath) return;

    const token = await getGitHubAccessToken();
    if (!token) return vscode.window.showErrorMessage("Unable to get access token.");

    // await createGitHubRepo("code-tracking", token, workspacePath);

    const isInitialized = await isGitInitialized(workspacePath)
    vscode.window.showErrorMessage(`${isInitialized}`)

}
