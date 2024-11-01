import { NFTMetadata } from '@/types/nft';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function parseNftMetadata(metadataStr: string): NFTMetadata | null {
  try {
    const metadata: NFTMetadata = JSON.parse(metadataStr);

    // Ensure required fields are present
    if (metadata.image_url && metadata.name && metadata.attributes) {
      return metadata;
    } else {
      console.warn('Required metadata fields are missing.');
      return null;
    }
  } catch (error) {
    console.error('Failed to parse metadata:', error);
    return null;
  }
}

export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    throw new Error(
      'Invalid input: value must be a number or a numeric string.'
    );
  }

  if (num < 1000) return num.toString();
  if (num >= 1_000 && num < 1_000_000)
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (num >= 1_000_000 && num < 1_000_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000_000_000 && num < 1_000_000_000_000)
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000_000_000)
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';

  return num.toString(); // For very large values, it will display as-is
}
