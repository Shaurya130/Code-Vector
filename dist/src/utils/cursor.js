export function encodeCursor(payload) {
    return Buffer.from(JSON.stringify(payload)).toString("base64");
}
export function decodeCursor(cursor) {
    return JSON.parse(Buffer.from(cursor, "base64").toString("utf-8"));
}
//# sourceMappingURL=cursor.js.map