export function decodeBase64(input: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(input, 'base64').toString('utf-8');
  } else {
    const binary = atob(input);
    const percentEncoded = binary
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('');

    return decodeURIComponent(percentEncoded);
  }
}
