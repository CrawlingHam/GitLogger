import { vscode } from "./imports";

export function logProblem(message: string, details: string) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection("GitStatus");
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;
    const fileUri = vscode.Uri.file(workspacePath);

    const diagnostic = new vscode.Diagnostic(new vscode.Range(0, 0, 0, 1), `${message}: ${details}`, vscode.DiagnosticSeverity.Warning);

    diagnosticCollection.set(fileUri, [diagnostic]);
}
