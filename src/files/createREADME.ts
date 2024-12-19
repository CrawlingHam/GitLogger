export async function createReadme(url: string, token: string, content: string) {
    try {
        const body = JSON.stringify({
            message: "Create README.md",
            content: Buffer.from(content, "utf8").toString("base64"),
        });

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
            body,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Error creating README.md: ${(error as { message: string }).message}`);
        }

        return {
            created: true,
            error: null,
        };
    } catch (error) {
        return {
            created: false,
            error: (error as Error).message,
        };
    }
}
