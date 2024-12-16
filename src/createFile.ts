export async function createFileInRepo(repoName: string, token: string, username: string, fileName: string, description: string) {
    const encodedContent = Buffer.from(description).toString("base64");
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/${fileName}`;

    try {
        const createResponse = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Create code-tracking.md",
                content: encodedContent,
            }),
        });

        if (!createResponse.ok) {
            const error = await createResponse.json();
            throw new Error((error as Error).message);
        }

        const result = await createResponse.json();
        return {
            success: true,
            content_URL: (result as { html_url: string }).html_url;,
            sha: (result as { sha: string }).sha,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            content_URL: null,
            sha: undefined,
            error: (error as Error).message,
        };
    }
}
