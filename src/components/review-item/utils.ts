const REVIEW_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'long',
  year: 'numeric',
};

export function formatReviewDate(date: string): string {
  return new Date(date).toLocaleString('en-US', REVIEW_DATE_FORMAT);
}
