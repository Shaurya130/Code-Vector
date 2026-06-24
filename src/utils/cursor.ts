export interface CursorPayload {
  snapshotTime: string;
  updatedAt: string;
  id: string;
}

export function encodeCursor(payload: CursorPayload) {
  return Buffer.from(
    JSON.stringify(payload)
  ).toString("base64");
}

export function decodeCursor(cursor: string) {
  return JSON.parse(
    Buffer.from(cursor, "base64").toString("utf-8")
  ) as CursorPayload;
}