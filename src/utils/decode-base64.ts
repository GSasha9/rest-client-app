export function decodeBase64(input: string): string {
  const decoded = decodeURIComponent(input);
  const raw = Buffer.from(decoded, 'base64').toString('utf-8');

  return raw;
}
