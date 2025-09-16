export function searchParamsToObject(
  params: URLSearchParams | null
): Record<string, string> {
  const result: Record<string, string> = {};

  if (!params) return result;

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
