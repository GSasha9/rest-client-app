import sdk from 'postman-collection';
import codegen from 'postman-code-generators';
import { RestData } from '../models/rest-client';

export interface CodeGeneratorData extends RestData {
  convertTo: { language: string; variant: string };
}

const codeGenerator = ({
  url,
  method,
  headers,
  body,
  convertTo,
}: CodeGeneratorData) => {
  if (!url || !method || body === null) return '';

  const request = new sdk.Request({
    url: url,
    method: method,
    header: Object.entries(headers).map(([key, value]) => ({ key, value })),
    body: {
      mode: 'raw',
      raw: body,
    },
  });

  let result = '';

  codegen.convert(
    convertTo.language,
    convertTo.variant,
    request,
    {},
    (error: Error | null, snippet: string) => {
      if (error) {
        console.error(error);
      } else {
        console.log(snippet);
        result = snippet;
      }
    }
  );

  console.log(codegen.getLanguageList());

  return result;
};

export default codeGenerator;
