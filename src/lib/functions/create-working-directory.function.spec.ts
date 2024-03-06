import { existsSync } from 'node:fs';
import { execPromise } from '@onivoro/server-process';
import { createWorkingDirectory } from './create-working-directory.function';
import { getFilePaths } from './get-file-paths.function';

describe('createWorkingDirectory', () => {
  it('worx', async () => {
    const originalname = 'blah.docx';
    const { inflated, root } = getFilePaths(originalname);
    expect(existsSync(inflated)).toBe(false);
    await createWorkingDirectory(originalname);
    expect(existsSync(inflated)).toBe(true);
    await execPromise(`rm -rf ${root}`);
  });
});