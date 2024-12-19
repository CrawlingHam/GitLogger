import { exec } from "../imports";

export function isGitInitialized(folderPath: string): Promise<boolean> {
    return new Promise((resolve) => {
        exec("git rev-parse --is-inside-work-tree", { cwd: folderPath }, (error, stdout, stderr) => {
            if (error || stderr) {
                resolve(false);
            } else {
                resolve(stdout.trim() === "true");
            }
        });
    });
}
