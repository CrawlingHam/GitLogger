type ParseGitLog = {
    filesChanged: string[];
    message: string;
    hash: string;
    date: string;
};

type ActivateResult = {
    success: boolean;
    error?: string;
    data?: any;
};

type Commit = {
    commit: string;
    author: string;
    date: string;
    message: string;
    files: string[];
};

export {
    Commit,
    ParseGitLog,
    ActivateResult,
}