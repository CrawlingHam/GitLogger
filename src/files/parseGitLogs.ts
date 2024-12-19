export function parseGitLog(logOutput: string): Array<any> {
    const logEntries: Array<any> = [];
    const logLines = logOutput.split("\n");
    let currentEntry: any = null;

    for (const line of logLines) {
        // Match commit line
        const commitMatch = line.match(/^commit (\w+)/);
        if (commitMatch) {
            // If we find a new commit, push the current entry if it exists
            if (currentEntry) {
                logEntries.push(currentEntry);
            }
            currentEntry = {
                commit: commitMatch[1],
                author: "",
                date: "",
                message: "",
                files: [],
            };
            continue;
        }

        // Match author line
        const authorMatch = line.match(/^Author:\s+(.*)$/);
        if (authorMatch && currentEntry) {
            currentEntry.author = authorMatch[1].trim();
            continue;
        }

        // Match date line
        const dateMatch = line.match(/^Date:\s+(.*)$/);
        if (dateMatch && currentEntry) {
            currentEntry.date = dateMatch[1].trim();
            continue;
        }

        // Match commit message (assumed to be the next non-empty line after the date)
        if (currentEntry && line.trim() !== "" && !currentEntry.message) {
            currentEntry.message = line.trim();
            continue;
        }

        // Match file changes line (from `git log --name-status`)
        const fileChangeMatch = line.match(/^([MAD])\s+(.*)$/); // Match status and filename
        
        if (fileChangeMatch && currentEntry) {
            currentEntry.files.push(fileChangeMatch[2].trim()); // Push the file name
        }
    }

    // Push the last entry if it exists
    if (currentEntry) {
        logEntries.push(currentEntry);
    }

    return logEntries;
}
