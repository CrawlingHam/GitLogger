import { createReadme } from "./createREADME";

export async function ensureReadmeContent(username: string, repoName: string, token: string) {
    const fileName = "README.md";
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/${fileName}`;
    const headers = {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
    };
    const defaultContent = `
# Code Tracking Extension

This project is a code tracking extension designed to enhance your coding workflow by providing detailed tracking and logging of code changes. The extension monitors your Git commits, captures relevant metadata, and organizes this information in a structured manner. It allows you to easily review the history of your code modifications, keeping track of what has been changed, the purpose behind each commit, and the timeline of your development activities.

The extension stores data related to your Git commits, including commit messages, authors, timestamps, and the files affected by each commit. It fetches this information directly from your Git repository, ensuring that you have an up-to-date view of your project’s history. Additionally, it provides functionality to create and manage task logs, helping you maintain a clear record of your coding tasks and progress. This ensures that your development process is not only efficient but also well-documented.

By utilizing this extension, you can enhance your productivity, stay organized, and maintain a comprehensive overview of your coding journey.


###### Latest commit file: task0_log.md
        `;
    try {
        // Check if README.md exists
        const response = await fetch(url, { method: "GET", headers });
        if (response.ok) {
            // File exists, fetch details
            const data = await response.json();

            // Decode Base64 content
            const content = Buffer.from((data as any).content, "base64").toString("utf8");
            const sha = (data as { sha: string }).sha;

            return {
                exists: true,
                content,
                sha,
                error: null,
            };
        } else if (response.status === 404) {
            // File doesn't exist, create it
            const readmePath = `https://api.github.com/repos/${username}/${repoName}/contents/README.md`;
            const res = await createReadme(readmePath, token, defaultContent);
            if (!res.created) throw new Error(res.error || "");

            // Fetch content and SHA
            const newResponse = await fetch(url, { method: "GET", headers });
            if (newResponse.ok) {
                const newData = await newResponse.json();
                const content = Buffer.from((newData as { content: any }).content, "base64")
                    .toString("utf8")
                    .trim();
                const sha = (newData as { sha: string }).sha;

                return {
                    exists: true,
                    content,
                    sha,
                    error: null,
                };
            } else {
                const error = await newResponse.json();
                throw new Error(`Error fetching newly created README.md: ${(error as Error).message}`);
            }
        } else {
            const error = await response.json();
            throw new Error((error as { message: string }).message);
        }
    } catch (error) {
        return {
            exists: false,
            content: null,
            sha: null,
            error: (error as Error).message,
        };
    }
}
