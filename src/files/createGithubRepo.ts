import { vscode } from "../imports";

export async function createGitHubRepo(repoName: string, accessToken: string) {
    const url = `https://api.github.com/user/repos`;
    const options = {
        method: "POST",
        headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
            name: repoName,
            private: true,
        }),
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
        return {
            success: true,
            error: null,
        };
    } catch (error) {
        vscode.window.showErrorMessage("Error creating repository: " + (error as Error).message);
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
