import { execPromise } from '@onivoro/server-process';
import { extractContentFromDocx } from './extract-content-from-docx.function';
import { getFilePaths } from './get-file-paths.function';

describe('extractContentFromDocx', () => {
    it('extracts the text from a docx file on disk', async () => {
        const filename = 'test.docx';
        const { inflated } = getFilePaths(filename);
        expect(await extractContentFromDocx(filename)).toMatchSnapshot();
        await execPromise(`rm -rf ${inflated}`);
    });
});