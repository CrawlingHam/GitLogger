import { exec } from "./imports";

export function isGitInitialized(folderPath: string): Promise<boolean> {
    return new Promise((resolve) => {
        exec("git rev-parse --is-inside-work-tree", { cwd: folderPath }, (error, stdout, stderr) => {
            if (error || stderr) {
                resolve(false); // Not a Git repository or an error occurred
            } else {
                resolve(stdout.trim() === "true"); // Check if Git repository
            }
        });
    });
}
