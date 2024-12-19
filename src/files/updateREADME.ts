export async function updateReadme(token: string, sha: string, number: number, username: string, repoName: string) {
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/README.md`;
    const fileName = `task${number + 1}_log.md`;
    const content = `
# Code Tracking Extension

This project is a code tracking extension designed to enhance your coding workflow by providing detailed tracking and logging of code changes. The extension monitors your Git commits, captures relevant metadata, and organizes this information in a structured manner. It allows you to easily review the history of your code modifications, keeping track of what has been changed, the purpose behind each commit, and the timeline of your development activities.

The extension stores data related to your Git commits, including commit messages, authors, timestamps, and the files affected by each commit. It fetches this information directly from your Git repository, ensuring that you have an up-to-date view of your project’s history. Additionally, it provides functionality to create and manage task logs, helping you maintain a clear record of your coding tasks and progress. This ensures that your development process is not only efficient but also well-documented.

By utilizing this extension, you can enhance your productivity, stay organized, and maintain a comprehensive overview of your coding journey.


###### Latest commit file: ${fileName}
        `;
        
    try {
        const body = JSON.stringify({
            message: "Update README.md",
            content: Buffer.from(content, "utf8").toString("base64"),
            sha,
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
            throw new Error(`Error updating README.md: ${(error as { message: string }).message}`);
        }

        return {
            success: true,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
