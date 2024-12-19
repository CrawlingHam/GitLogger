import { Commit } from "../imports";

export function constructMarkdownTable(commit: Commit, workFolder: string, path: string, remoteFilePath: { [key: string]: string | null }): string {
    // Extract the folder name from the workspace folder path
    let folderName = workFolder.split("\\").pop() || "Unknown Folder";

    // Create the header of the Markdown table
    let markdownContent = `| File(s) Changed                           | Commit Message       | Commit ID                          | Date Committed       |\n`;
    markdownContent += `| :---------------------------------------: | :------------------: | :--------------------------------: | :------------------: |\n`;

    // Extract data from the single commit
    const filesChanged = commit.files.map((file) => file); // Extract filename
    const lengthOfFiles = filesChanged.length;
    const commitDate = formatDate(commit.date); // Format the date
    const commitMessage = commit.message; // Commit message
    const commitID = commit.commit; // Commit ID

    // Add the first row summarizing the commit
    markdownContent += `| \`${lengthOfFiles} file(s) changed in ${folderName}\` | \`${commitMessage}\` | \`${commitID}\` | \`${commitDate}\` |\n`;

    // Add each file changed as a new row
    filesChanged.forEach((file) => {
        // Check if the remote file path exists
        const link = remoteFilePath[file] ? `[View Changes](${remoteFilePath[file]})` : "";
        const fileLink = `[View File](https://github.com/${path}?path=${file})` || "";
        markdownContent += `| \`${file}\` | ${link} | ${fileLink} | |\n`;
    });

    return markdownContent;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = String(date.getFullYear());
    const day = String(date.getDate()).padStart(2, "0"); 
    const hours = String(date.getHours()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export type FileChanged = {
    name: string;
    link: string;
};
