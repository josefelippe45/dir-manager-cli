import { Command } from "commander";
import { CLI_DESCRIPTION, VERSION, cliOptions } from "../config/Config";
import { CliOption } from "../type/CliOption";

export default class Cli {
    private command: Command;

    constructor(cli: Command) {
        this.command = cli;
    }

    public execute(): Command {
        this.command.version(VERSION).description(CLI_DESCRIPTION);
        this.createOptions(cliOptions);
        return this.command.parse(process.argv);
    }

    private createOptions(options: CliOption[]): void {
        for (const option of options) {
            const { flags, description, defaultValue } = option;
            this.command.option(flags, description, defaultValue);
        }
    }

}