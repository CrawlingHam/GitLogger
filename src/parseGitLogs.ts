import { ParseGitLog } from "./imports";

export function parseGitLog(logOutput: string): ParseGitLog[] {
    const logs: ParseGitLog[] = [];
    const entries = logOutput.split("\n\ncommit "); // Separate commits by "commit"

    for (const entry of entries) {
        const lines = entry.trim().split("\n");

        if (!lines[0].startsWith("commit")) continue;

        const hash = lines[0].replace("commit ", "").trim();
        const authorLine = lines.find((line) => line.startsWith("Author:"));
        const dateLine = lines.find((line) => line.startsWith("Date:"));
        const message = lines.find((line, idx) => idx > 0 && lines[idx - 1].startsWith("Date:"))?.trim() || "";
        const filesChanged = lines.filter((line) => line.includes(" | ")).map((line) => line.split(" | ")[0].trim());

        if (hash && authorLine && dateLine) {
            const date = new Date(dateLine.replace("Date: ", "").trim()).toISOString();
            logs.push({ filesChanged, message, hash, date });
        }
    }

    return logs;
}
