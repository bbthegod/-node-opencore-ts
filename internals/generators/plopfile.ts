import shell from 'shelljs';
import { NodePlopAPI } from 'node-plop';
import { apiGenerator } from './api';
interface PrettifyCustomActionData {
  path: string;
}

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator('API', apiGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data as PrettifyCustomActionData;
    console.log(`Running: yarn prettify --write ${data.path} && yarn prettify src/routes.ts`);
    shell.exec(`yarn prettify --write ${data.path} && yarn prettify src/routes.ts`, { silent: true });
    return '';
  });
  plop.setHelper('upperCase', txt => txt.toUpperCase());
  plop.setHelper('lowerCase', txt => txt.toLowerCase());
}
