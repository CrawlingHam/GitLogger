import { vscode } from "../imports";

export function handleError(error: string) {
    vscode.window.showErrorMessage(error);
    console.log(error);
}
