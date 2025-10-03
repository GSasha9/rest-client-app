import sdk from 'postman-collection';
import codegen from 'postman-code-generators';
import { RestData } from '../models/rest-client';

export interface CodeGeneratorData extends RestData {
  convertTo: { language: string; variant: string };
}

const codeGenerator = async ({
  url,
  method,
  headers,
  body,
  convertTo,
}: CodeGeneratorData): Promise<string> => {
  if (!url || !method) return '';

  const request = new sdk.Request({
    url: url,
    method: method,
    header: Object.entries(headers).map(([key, value]) => ({ key, value })),
    body: {
      mode: 'raw',
      raw: body || '',
    },
  });

  return new Promise((resolve, reject) => {
    codegen.convert(
      convertTo.language,
      convertTo.variant,
      request,
      {},
      (error: Error | null, snippet: string) => {
        if (error) reject(error);
        else resolve(snippet);
      }
    );
  });
};

export default codeGenerator;
