export function serverSearchParamsToObject(
  headers?: Record<string, string | string[] | undefined>
): Record<string, string> {
  const result: Record<string, string> = {};

  if (!headers) return result;

  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === 'string') {
      result[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      result[key] = value[0];
    }
  }

  return result;
}
