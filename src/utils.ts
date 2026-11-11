const MAX_RATING = 5;
const RATING_PERCENT_MULTIPLIER = 100 / MAX_RATING;

export function getRatingWidth(rating: number): number {
  return Math.round(rating) * RATING_PERCENT_MULTIPLIER;
}

export function getPluralizedLabel(count: number, word: string): string {
  return `${count} ${count === 1 ? word : `${word}s`}`;
}
