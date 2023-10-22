import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {

  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
      ${chalk.magenta('Пример:')}
            cli.js --<command> [--arguments]
      ${chalk.magenta('Команды:')}
            --version:                   # выводит номер версии приложения
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из файла ${('<path>')} с расширением .tsv
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных из файла ${('<path>')}
    `);
  }
}
