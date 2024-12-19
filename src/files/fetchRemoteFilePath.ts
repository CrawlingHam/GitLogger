export default async function fetchRemoteFilePath(path: string, files: string[], token: string) {
    const filePaths: { [key: string]: string | null } = {};

    for (const file of files) {
        const apiUrl = `https://api.github.com/repos/${path}/commits?path=${file}`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: "application/vnd.github.v3+json",
                },
            });

            if (!response.ok) {
                filePaths[file] = null;
                continue;
            }

            const commitData: any = await response.json();
            if (commitData.length > 0) {
                filePaths[file] = `https://github.com/${path}/commits?path=${file}`;
            } else {
                filePaths[file] = null;
            }
        } catch (error) {
            filePaths[file] = null; 
        }
    }
    return filePaths;
}
