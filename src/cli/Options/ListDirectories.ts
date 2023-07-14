import { promises as fsPromises, Stats } from 'fs';
import { resolve } from 'path';
import { ErrorHandler } from '../../decorator/ErrorHandler';
import type { FileDetail } from '../../type/FileDetail';
import { KILOBYTE_SUFIX, KILOBYTE_VALUE } from '../../config/Config';

export default class ListDirectories {
    public async execute(filePath: string): Promise<FileDetail[]> {
        return this.getDirectoryDetails(filePath);
    }

    @ErrorHandler
    private async getDirectoryDetails(filePath: string): Promise<FileDetail[]> {
        const files: string[] = await fsPromises.readdir(filePath);
        const detailedFilesPromises: Promise<FileDetail>[] = files.map(async (file: string) => {
            const fileDetails: Stats = await fsPromises.lstat(resolve(filePath, file));
            const { size, birthtime } = fileDetails;

            return { filename: file, size: this.getStringifiedSizeInKilobytes(size), createdAt: this.normalizeFileDate(birthtime) };
        });
        const detailedFiles: FileDetail[] = await Promise.all(detailedFilesPromises);

        return detailedFiles;
    }

    private getStringifiedSizeInKilobytes(size: number): string {
        const decimalCases = 2;
        const kilobyteSize = String((size / KILOBYTE_VALUE).toFixed(decimalCases));
        return `${kilobyteSize} (${KILOBYTE_SUFIX})`
    }

    private normalizeFileDate(date: Date): string {
        return date.toUTCString();
    }

}