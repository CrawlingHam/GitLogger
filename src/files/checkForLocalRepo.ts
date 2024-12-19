export async function checkForRepo(username: string, repoName: string, token: string) {
    const url = `https://api.github.com/repos/${username}/${repoName}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        if (response.ok) {
            // Repository already exists
            return {
                exists: true,
                error: null,
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
        };
    }
}
