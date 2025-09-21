export const isVariables = (data: unknown): data is Record<string, string> => {
  return (
    !!data &&
    typeof data === 'object' &&
    Object.entries(data).every(
      ([key, value]) => typeof key === 'string' && typeof value === 'string'
    )
  );
};
