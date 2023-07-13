import { Command } from 'commander';
import figlet from 'figlet';
import { cliOptions } from './config/Config';
import Cli from './cli/Cli';

const command = new Command();
new Cli(command, cliOptions).execute();

console.log(figlet.textSync("Dir Manager"));