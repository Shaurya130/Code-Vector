export interface CursorPayload {
    snapshotTime: string;
    updatedAt: string;
    id: string;
}
export declare function encodeCursor(payload: CursorPayload): string;
export declare function decodeCursor(cursor: string): CursorPayload;
//# sourceMappingURL=cursor.d.ts.map