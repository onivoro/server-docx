import { mkdir, readFile, rm, rmdir, writeFile, copyFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { unzip, zip } from "@onivoro/server-disk";
import { execPromise } from "@onivoro/server-process";
import { getFilePaths } from "./get-file-paths.function";

export type TExpressFile = {
    originalname: string,
    buffer: any,
    filename: string,
};

export type TDocx = {
    xml: string;
};

export async function docx(docxFilePath: string, callback?: (result: TDocx) => Promise<TDocx | undefined | void>) {
    const discriminator = randomUUID();

    let xml: string;
    let modifiedOutputFile: string;

    const { contentPath, inflated, outputFileName, outputFilePath } = getFilePaths(docxFilePath, discriminator);

    try {
        await mkdir(inflated, { recursive: true });

        await unzip(docxFilePath, inflated);

        xml = await readFile(contentPath, 'utf-8');

        let externalResult: TDocx | undefined | void;

        if (callback) {

            try {
                externalResult = await callback({ xml });

            } catch (error: any) {
                console.error('docx external callback errored');
            }

            if (externalResult && externalResult.xml) {
                await writeFile(contentPath, externalResult?.xml, 'utf-8');

                await zip(outputFileName, inflated);

                modifiedOutputFile = `${discriminator}-${outputFileName}`;

                await copyFile(outputFilePath, modifiedOutputFile);

                xml = externalResult.xml;
            }
        }

        await rmSafe(discriminator);
    } catch (error: any) {
        console.error(error);
        await rmSafe(discriminator);
    }

    return { xml, modifiedOutputFile };
}

async function rmSafe(dir: string) {
    try {
        // await rm(dir, {recursive: true, force: true});
        await execPromise(`rm -rf "${dir}"`);
    } catch (error: any) {
        console.error(`failed to delete directory "${dir}"`);
    }
}