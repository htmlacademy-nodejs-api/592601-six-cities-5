import { CLIApplication, HelpCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
  ]);

  console.log('process.argv', process.argv);
  cliApplication.processCommand(process.argv);
}

bootstrap();
