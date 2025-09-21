export function getCssVar(name: string) {
  if (typeof window === 'undefined') return '';

  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
