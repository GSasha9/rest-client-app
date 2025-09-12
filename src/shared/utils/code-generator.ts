import sdk from 'postman-collection';
import codegen from 'postman-code-generators';
import { HeaderItem, Methods } from '../../models/rest-client';

export interface CodeGeneratorData {
  url: string;
  method: Methods;
  headers: HeaderItem[];
  body?: string;
  convertTo: { language: string; variant: string };
}

const codeGenerator = ({
  url,
  method,
  headers,
  body,
  convertTo,
}: CodeGeneratorData) => {
  const request = new sdk.Request({
    url: url,
    method: method,
    header: headers,
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
