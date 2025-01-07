import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [], // Strip all attributes
  });
}