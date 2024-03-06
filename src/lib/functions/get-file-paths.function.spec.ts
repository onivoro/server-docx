import { getFilePaths } from './get-file-paths.function';

describe('getFilePaths', () => {
    describe('creates a set of unique but conventional strings for inflating/deflating docx files on disk', () => {

        it('without a prefix', () => {
            expect(getFilePaths('asdf.docx')).toMatchSnapshot();
        });

        it('with a prefix', () => {
            expect(getFilePaths('asdf.docx', 'some-dir')).toMatchSnapshot();
        });
    });
});