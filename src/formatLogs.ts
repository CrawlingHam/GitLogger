import { ParseGitLog } from "./imports";

export function formatLogsAsMarkdown(logs: ParseGitLog[], repoOwner: string, repoName: string): string {
    const tableHeader = "| File(s) Changed | Commit Message | Date Committed |\n| --- | --- | --- |";
    const rows = logs.map(({ filesChanged, message, hash, date }) => {
        const fileLinks = filesChanged.map(
            (file) =>
                `[${file}](https://github.com/${repoOwner}/${repoName}/blob/${hash}/${file})`
        );
        const formattedDate = date.split("T")[0].replace(/-/g, ""); // YYYYMMDD format
        const formattedTime = date.split("T")[1].split(".")[0]; // HH:MM:SS format
        return `| ${fileLinks.join(", ")} | <span title="Commit: ${hash}">${message}</span> | <span title="${formattedTime}">${formattedDate}</span> |`;
    });

    return `${tableHeader}\n${rows.join("\n")}`;
}