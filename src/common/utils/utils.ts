export function parseBoolean(value: string | number): boolean {
  switch (typeof value) {
    case 'string': return value === 'true';
    case 'number': return value === 1;
    default: throw new Error(`Could not parse ${value} to boolean`);
  }
}
