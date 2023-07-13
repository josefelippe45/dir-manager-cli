import { Command } from 'commander';
import figlet from 'figlet';
import Cli from './cli/Cli';

const command = new Command();
new Cli(command).execute();

console.log(figlet.textSync("Dir Manager"));