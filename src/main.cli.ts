#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication, HelpCommand, VersionCommand, ImportCommand, GenerateCommand} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  console.log('process.argv', process.argv);
  cliApplication.processCommand(process.argv);
}

bootstrap();
