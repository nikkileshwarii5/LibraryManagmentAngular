export function getTimeRemaining(expiresAt: string): string | null {
  if (!expiresAt) return null;

  const now: any = new Date();
  const expires: any = new Date(expiresAt);

  const diff = expires - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (hours < 0) return 'Expired';

  if (hours === 0) {
    return `${minutes}m remaining`;
  }

  return `${hours}h ${minutes}m remaining`;
}