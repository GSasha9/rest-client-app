declare module 'postman-code-generators' {
  export function convert(
    language: string,
    variant: string,
    request: sdk.Request,
    options: object,
    callback: (error: Error | null, snippet: string) => void
  ): void;

  export function getLanguageList(): Array<{
    key: string;
    label: string;
    variants: Array<{
      key: string;
      label: string;
    }>;
  }>;
}
