import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { exec } from "child_process";
import { ParseGitLog } from "./types";
import { runGitLog } from "./runGitLog";
import { logProblem } from "./logProblem";
import { parseGitLog } from "./parseGitLogs";
import { createFileInRepo } from "./createFile";
import { createRepository } from "./createRepo";
import { saveCommitLogs } from "./saveCommitLogs";
import { checkGitStatus } from "./checkGitStatus";
import { formatLogsAsMarkdown } from "./formatLogs";
import { createGitHubRepo } from "./createGithubRepo";
import { getWorkspacePath } from "./getWorkspacePath";
import { getGitHubUsername } from "./getGithubUsername";
import { getGitHubAccessToken } from "./getGithubToken";
import { updateCodeTracking } from "./updateCodeTracking";
import { isGitInitialized } from "./isGitInitalized";

export {
    fs,
    exec,
    path,
    vscode,
    runGitLog,
    logProblem,
    parseGitLog,
    ParseGitLog,
    checkGitStatus,
    saveCommitLogs,
    createGitHubRepo,
    createRepository,
    getWorkspacePath,
    createFileInRepo,
    isGitInitialized,
    getGitHubUsername,
    updateCodeTracking,
    getGitHubAccessToken,
    formatLogsAsMarkdown,
};
