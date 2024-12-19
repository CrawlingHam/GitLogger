import { LogCommit } from "../imports";

let committing = false; 

export function initializeCommitLogging(intervalMinutes: number, intervalHandle: NodeJS.Timeout | null) {
    if (intervalHandle) {
        clearInterval(intervalHandle);
    }

    intervalHandle = setInterval(async () => {
        await LogCommit();
    }, intervalMinutes * 60 * 1000);
}

export async function LogCommitIfNotInProgress() {
    if (committing) return; // Exit if already committing

    committing = true; // Set flag to true
    try {
        await LogCommit();
    } catch (error) {
        console.error("Error during log commit:", error);
    } finally {
        committing = false; // Reset flag after commit attempt
    }
}

export function resetCommitLogging(newInterval: number, intervalHandle: NodeJS.Timeout | null) {
    initializeCommitLogging(newInterval, intervalHandle);
}
