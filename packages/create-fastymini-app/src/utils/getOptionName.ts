export function getOptionName(flag: string) {
  const longFlag = flag.split(/[ ,]+/).find(f => f.startsWith('--'));
  if (!longFlag) return '';
  return longFlag
    .replace(/^--(no-)?/, '')
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
