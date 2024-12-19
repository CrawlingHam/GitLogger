export function extractTaskFile(content: string) {
    const fileRegex = /###### Latest commit file:\s*(task\d+_log\.md)/;
    const fileMatch = content.match(fileRegex);

    const fileName = fileMatch ? fileMatch[1] : null;

    if (fileName === null) return null;

    const numberRegex = /task(\d+)_log\.md/;
    const numberMatch = fileName.match(numberRegex);
    return numberMatch ? parseInt(numberMatch[1], 10) : null;
}
