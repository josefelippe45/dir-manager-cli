import ListDirectories from "../cli/Options/ListDirectories";

function isDateInUTCFormat(dateToBeCompared: string): boolean {
    const dateToCompare = new Date(dateToBeCompared).toUTCString();
    return dateToCompare === dateToBeCompared;
}

describe('Suite - ListDirectories - Unit test', () => {
    let listDirectories: ListDirectories;

    beforeAll(() => {
        listDirectories = new ListDirectories();
    });


    it('should have file details formatted', async () => {
        const filePath = __dirname;
        const fileDetails = await listDirectories.execute(filePath);
        const sizeFormatPatter = /^\d*.(\d{2}) \(KB\)/;

        fileDetails.forEach(fileDetail => {
            const { size, createdAt } = fileDetail;
            expect(sizeFormatPatter.test(size)).toBe(true);
            expect(isDateInUTCFormat(createdAt)).toBe(true);
        });
    });
});