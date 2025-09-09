import sdk from 'postman-collection';
import codegen from 'postman-code-generators';

export interface codeGeneratorData {
  url: string;
  method: string;
  header: { key: string; value: string }[];
  body: string;
  convertTo: { language: string; variant: string };
}

const codeGenerator = ({
  url,
  method,
  header,
  body,
  convertTo,
}: codeGeneratorData) => {
  const request = new sdk.Request({
    url: url,
    method: method,
    header: header,
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
