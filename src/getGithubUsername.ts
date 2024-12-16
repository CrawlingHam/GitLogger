export async function getGitHubUsername(accessToken: string) {
    const url = "https://api.github.com/user";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error((data as Error).message);
        return { success: true, error: null, username: (data as { login: string }).login };
    } catch (error) {
        console.error("Error fetching GitHub username:", (error as Error).message);
        return { success: false, error: (error as Error).message, username: null };
    }
}
