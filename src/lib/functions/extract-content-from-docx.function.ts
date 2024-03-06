import { readFile } from "node:fs/promises";
import { getFilePaths } from "./get-file-paths.function";
import { unzip } from '@onivoro/server-disk';

export async function extractContentFromDocx(originalname: string) {
    const paths = getFilePaths(originalname);
    await unzip(paths.inputFilePath, paths.inflated);
    const content = await readFile(paths.contentPath, 'utf-8');
    return { ...paths, content };
}