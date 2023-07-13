import { Command } from "commander";
import Cli from "../cli/Cli";
import { cliOptionsFixture } from "./fixture/CliFixture";

describe('Suite - Cli - Unit test', () => {
    let command: Command;
    let commandOptionSpy: jest.SpyInstance;
    let commandParseSpy: jest.SpyInstance;
    beforeAll(() => {
        command = new Command();
        commandOptionSpy = jest.spyOn(command, 'option');
        commandParseSpy = jest.spyOn(command, 'parse').mockResolvedValue(null as never);
    });

    it('should call Command\'s option method for every option provided', () => {
        const expectedNumberOfCalls = cliOptionsFixture.length;
        new Cli(command, cliOptionsFixture).execute();
        expect(commandOptionSpy).toHaveBeenCalledTimes(expectedNumberOfCalls);
    });
});