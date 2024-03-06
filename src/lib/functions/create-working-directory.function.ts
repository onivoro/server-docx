import { execPromise } from '@onivoro/server-process';
import { getFilePaths } from './get-file-paths.function';

export async function createWorkingDirectory(originalname: string) {
    const { inflated } = getFilePaths(originalname);
    await execPromise(`mkdir -p "${inflated}"`);
  }