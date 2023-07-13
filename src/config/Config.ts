import { CliOption } from "../type/CliOption";

export const CLI_DESCRIPTION = "An example CLI for managing a directory";
export const VERSION = '1.0.0';
export const cliOptions: CliOption[] = [
    { flags: "-l, --ls  [value]", description: "List directory contents" },
    { flags: "-m, --mkdir <value>", description: "Create a directory" },
    { flags: "-t, --touch <value>", description: "Create a file" },
]