export const applyVariables = (
  variables: [string, string][],
  str?: string | null
) =>
  variables.reduce((acc, [variable, value]) => {
    const regex = new RegExp(`{{${variable}}}`, 'g');

    return acc?.replace(regex, value);
  }, str);
