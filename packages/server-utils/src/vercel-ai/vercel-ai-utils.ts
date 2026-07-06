/** Pure, state-free helpers shared across the Vercel AI (`ai`) channel subscribers. */

/** Narrow to a string, or `undefined` for anything else. */
export function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

/** Narrow to a finite number, or `undefined` for anything else (including `NaN`). */
export function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && !isNaN(value) ? value : undefined;
}

/** Add two optional numbers, treating a missing operand as `0` but returning `undefined` when both are absent. */
export function sum(a: number | undefined, b: number | undefined): number | undefined {
  return a === undefined && b === undefined ? undefined : (a ?? 0) + (b ?? 0);
}

/** Narrow to a non-null object (records and arrays alike). */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Stringify a value, passing strings through and falling back to a placeholder on circular/unserializable input. */
export function safeStringify(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return '[unserializable]';
  }
}
