import { vscode } from "./imports";

export async function getGitHubAccessToken() {
    const providerId = "github";

    try {
        const token = await vscode.authentication.getSession("github", ["repo", "user"], { createIfNone: false });
        if (!token) throw new Error("Please log in to GitHub to use GitLogger. Click on the Accounts icon in the Activity Bar to log in.");
        return { success: true, error: null, token: token.accessToken };
    } catch (error) {
        const message = "Failed to get GitHub access token: " + (error as Error).message;
        return { success: false, error: (error as Error).message, token: null };
    }
}
 