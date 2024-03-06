import { writeContentToDocx } from './write-content-to-docx.function';
import { getFilePaths } from "./get-file-paths.function";
import { extractContentFromDocx } from "./extract-content-from-docx.function";
import { execPromise } from '@onivoro/server-process';

const token = '{{DATE}}';
const replacement = '{{blah}}';

describe('writeContentToDocx', () => {
    it('does what you expect', async () => {
        // preconditions
        const originalname = 'test.docx';
        const { inflated, outputFileName } = getFilePaths(originalname);
        const { content, contentPath } = await extractContentFromDocx(originalname);
        expect(content.includes(replacement)).toBe(false);

        // execution and verification
        await writeContentToDocx(contentPath, content.replace(token, replacement), inflated, outputFileName);
        const { content: updatedContent } = await extractContentFromDocx(originalname);
        expect(updatedContent.includes(replacement)).toBe(true);

        // restoration
        await writeContentToDocx(contentPath, updatedContent.replace(replacement, token), inflated, outputFileName);
        const { content: restoredContent } = await extractContentFromDocx(originalname);
        expect(restoredContent.includes(replacement)).toBe(false);

        await execPromise(`rm -rf ${inflated}`);
    });
});