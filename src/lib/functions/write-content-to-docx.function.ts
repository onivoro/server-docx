import { writeFile } from "node:fs/promises";
import { zip } from '@onivoro/server-disk';

export async function writeContentToDocx(
    contentPath: string,
    updatedContent: any,
    inflated: string,
    outputFileName: string
) {
    await writeFile(contentPath, updatedContent, 'utf-8');

    await zip(outputFileName, inflated);

    return `${inflated}/${outputFileName}`;
}