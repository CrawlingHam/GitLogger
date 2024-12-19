import { promisify, exec } from "../imports";

const execPromise = promisify(exec);

export async function checkForRemoteRepository(workFolder: string) {
    try {
        const { stdout } = await execPromise("git remote get-url origin", { cwd: workFolder });
        return {
            exists: true,
            error: null,
            remote: stdout.trim(),
        };
    } catch (error) {
        return {
            exists: false,
            error: (error as Error).message,
            remote: null,
        };
    }
}
