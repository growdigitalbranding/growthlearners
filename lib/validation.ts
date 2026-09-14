/**
 * The callback form's field rules, in one place.
 *
 * Both the API route and the form component validate, and they have to agree:
 * the client check exists so a typo costs nothing rather than a network round
 * trip, and the server check exists because the client one is advisory and a
 * request can arrive without ever touching the form. Two copies of a regex
 * drift, and the failure mode is a lead the browser accepts and the server
 * silently rejects — so there is one copy, here.
 *
 * Error strings live here too: the same wording is shown whether the error was
 * raised on blur, on submit, or by the server, which means a person never sees
 * the message change while they are fixing the thing it describes.
 */

/** 10 digits starting 6–9, with an optional +91 / 0 prefix. */
export const MOBILE = /^(?:\+?91[\s-]?|0)?([6-9]\d{9})$/;

export const trimTo = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export const normaliseMobile = (value: unknown): string =>
  trimTo(value, 20).replace(/[\s-]/g, '');

export const FIELD_LIMITS = { name: 80, mobile: 20, org: 120 } as const;

/**
 * Returns the error for one field, or '' when it is acceptable.
 *
 * Empty is treated as valid on purpose. On blur that stops an untouched field
 * accusing someone of leaving it blank before they have had a chance to fill
 * it in — a field you tabbed through on the way somewhere else is not a
 * mistake yet. Submit catches genuinely empty required fields, because there
 * the person has said they are finished.
 */
export function validateField(field: 'name' | 'mobile' | 'org', value: string): string {
  if (field === 'name') {
    const name = trimTo(value, FIELD_LIMITS.name);
    if (!name) return '';
    return name.length < 2 ? 'Please enter your name.' : '';
  }

  if (field === 'mobile') {
    const mobile = normaliseMobile(value);
    if (!mobile) return '';
    return MOBILE.test(mobile) ? '' : 'Enter a 10-digit Indian mobile number.';
  }

  return '';
}

/** The whole form, as checked on submit. Empty required fields count here. */
export function validateForm(values: { name: string; mobile: string }): Record<string, string> {
  const errors: Record<string, string> = {};

  const name = trimTo(values.name, FIELD_LIMITS.name);
  if (name.length < 2) errors.name = 'Please enter your name.';

  const mobile = normaliseMobile(values.mobile);
  if (!MOBILE.test(mobile)) errors.mobile = 'Enter a 10-digit Indian mobile number.';

  return errors;
}

/**
 * The bare ten digits, for storage. Returns '' if the input is not a valid
 * number — callers should have validated first; this exists so the E.164 form
 * is derived in the same place as the rule that accepts it.
 */
export function tenDigits(value: unknown): string {
  const match = MOBILE.exec(normaliseMobile(value));
  return match ? match[1] : '';
}

/** The order fields appear in, so "focus the first invalid one" means the first one they meet. */
export const FIELD_ORDER = ['name', 'mobile', 'org'] as const;
