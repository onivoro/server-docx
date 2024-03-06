import { execPromise } from '@onivoro/server-process';
import { docx } from './docx.function';

const docxFilePath = 'test/test.docx';
const token = 'Test Document';
const replacement = 'UPDATED CONTENT';

describe('docx', () => {
    it('extracts xml from docx file', async () => {
        let result: string = '';
        await docx(docxFilePath, async ({ xml }) => {
            result = xml;
        });
        expect(result.includes(token)).toBe(true);
    });

    it('writes xml to docx file', async () => {
        const { modifiedOutputFile } = await docx(docxFilePath, async ({ xml }) => {
            return { xml: xml.replace(token, replacement) };
        });

        const { xml } = await docx(modifiedOutputFile);
        expect(xml.includes(token)).toBe(false);
        expect(xml.includes(replacement)).toBe(true);
        await execPromise(`rm -rf ${modifiedOutputFile}`);
    });
});