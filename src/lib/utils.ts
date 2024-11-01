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
