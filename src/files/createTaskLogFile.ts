export async function createTaskLogFile(username: string, repoName: string, number: number, token: string, content: string, message: string) {
    const fileName = `task${number + 1}_log.md`;
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/${fileName}`;

    try {
        // Check if the file already exists
        const existingFileCheck = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        let sha: string | null = null;
        if (existingFileCheck.ok) {
            const existingFileData = await existingFileCheck.json();
            sha = (existingFileData as { sha: string }).sha; // Get the SHA for the existing file to update it
        }

        // Prepare the content to create or update the file
        const fileData = {
            message: message, //`Create ${fileName}`,
            content: Buffer.from(content).toString("base64"), // Base64 encode the content
            ...(sha && { sha }), // Include SHA if updating
        };

        const createOrUpdateResponse = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
            body: JSON.stringify(fileData),
        });

        if (!createOrUpdateResponse.ok) {
            const error = await createOrUpdateResponse.json();
            throw new Error(`Failed to create/update file: ${(error as Error).message}`);
        }

        return {
            success: true,
            fileName,
            error: null,
            sha,
        };
    } catch (error) {
        return {
            success: false,
            fileName: null,
            error: (error as Error).message,
            sha: null,
        };
    }
}
