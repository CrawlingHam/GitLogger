export async function checkForFile(url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        }); 
        if (response.ok) {
            // File already exists
            const data = await response.json();
            const sha = (data as { sha: string }).sha;
            return {
                exists: true,
                error: null,
                sha,
            };
        } else {
            // Other errors
            const error = await response.json();
            throw new Error((error as Error).message);
        }
    } catch (error) {
        return {
            exists: false,
            error: (error as Error).message,
            sha: null,
        };
    }
}