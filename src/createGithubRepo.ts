import { vscode, getGitHubUsername, createFileInRepo, runGitLog } from "./imports";

export async function createGitHubRepo(repoName: string, accessToken: string, workspacePath: string) {
    const url = `https://api.github.com/user/repos`;
    const options = {
        method: "POST",
        headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({ name: repoName }),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.json();
            if ((error as Error).message === "Repository creation failed.") {
                throw new Error((error as Error).message);
            } else {
                throw new Error((error as Error).message);
            }
        }
        const result = await response.json();
        const repoURL = (result as { html_url: string }).html_url;
        vscode.window.showInformationMessage("Repository created: " + repoURL);
    } catch (error) {
        vscode.window.showErrorMessage("Error creating repository: " + (error as Error).message);
    }
}
