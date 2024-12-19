import {
    vscode,
    gitCommit,
    handleError,
    updateReadme,
    checkForRepo,
    extractTaskFile,
    isGitInitialized,
    createGitHubRepo,
    getWorkspacePath,
    getGitHubUsername,
    createTaskLogFile,
    ensureReadmeContent,
    fetchRemoteFilePath,
    initializeRepository,
    getGitHubAccessToken,
    constructMarkdownTable,
    checkForRemoteRepository,
} from "../imports";

export default async function saveCommits() {
    try {
        // Step 1: Get workspace folder
        const workFolder = getWorkspacePath();
        if (!workFolder) throw new Error("No workspace folder found. Please open a folder.");

        // Step 2: Check local Git initialization
        const isInitialized = await isGitInitialized(workFolder);
        if (!isInitialized) {
            // Initalize a local git repository
            const initalized = await initializeRepository(workFolder);
            if (!initalized.success) throw new Error(initalized.error || "Failed to initialize repository.");
        }

        // Get GitHub token
        const tokenResult = await getGitHubAccessToken();
        if (tokenResult.error !== null) throw new Error(tokenResult.error);
        const token = tokenResult.token;

        // Get GitHub username
        const usernameResult = await getGitHubUsername(token);
        if (usernameResult.error !== null) throw new Error(usernameResult.error);
        const username = usernameResult.username;

        // Ensure repository exists
        const repoName = "code-tracking";
        const repoResult = await checkForRepo(username, repoName, token);
        if (!repoResult.exists) {
            // Create repository
            const creationResult = await createGitHubRepo(repoName, token);
            if (creationResult.error !== null) throw new Error(creationResult.error);
        }

        // Run 'git commit'
        const gitResult = await gitCommit(workFolder);
        if (gitResult.error != null) throw new Error(gitResult.error);

        // Get the content from README.md
        const readResult = await ensureReadmeContent(username, repoName, token);
        if (readResult.error !== null) throw new Error(readResult.error);

        // Get the latest task log number from README.md file
        const latestTaskLogNumber = extractTaskFile(readResult.content);
        if (latestTaskLogNumber === null) throw new Error("Failed to get the latest task log number.");

        // Check for remote repository
        const remoteRepositoryUrl = await checkForRemoteRepository(workFolder);
        if (remoteRepositoryUrl.error !== null) throw new Error("No remote repository found.");
        const remoteRepositoryPath = remoteRepositoryUrl.remote.replace("https://github.com/", "").replace(".git", "");

        // Get the remote files' paths
        const remoteFilePath = await fetchRemoteFilePath(remoteRepositoryPath, gitResult.commit.files, token);

        // Construct markdown content
        const markdownContent = constructMarkdownTable(gitResult.commit, workFolder, remoteRepositoryPath, remoteFilePath);

        // Create task log file
        const taskLogResult = await createTaskLogFile(username, repoName, latestTaskLogNumber, token, markdownContent, gitResult.message);
        if (taskLogResult.error !== null) throw new Error(`Failed to create task${latestTaskLogNumber + 1}_log.md`);

        // Update README with new task number
        const readmeResult = await updateReadme(token, readResult.sha, latestTaskLogNumber, username, repoName);
        if (readmeResult.error !== null) throw new Error("Failed to update README.md file");

        vscode.window.showInformationMessage("Commit Saved Successfully.");
    } catch (error) {
        handleError((error as Error).message);
    }
}
