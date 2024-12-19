import { handleError, saveCommits } from "../imports";

export async function LogCommit() {
    try {
        await saveCommits();
    } catch (error) {
        handleError((error as Error).message);
    }
}
