export function encodeBase64(str: string) {
  const result = Buffer.from(str, 'utf-8').toString('base64');

  return encodeURIComponent(result);
}
