import convict from 'convict';

export type RestSchema = {
  PORT: number;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port', // указывать валидатор
    env: 'PORT', // взять определённую переменную из .env
    default: 4000 // взять по дефолту порт на 4000
  },
});
