export interface ApiResponse {
  status: string;
  page: number;
  page_size: number;
  cursor: string | null;
  result: NFTToken[];
}

export interface NFTToken {
  amount: string;
  token_id: string;
  token_address: string;
  contract_type: 'ERC721' | string;
  owner_of: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: string | NFTMetadata; // Can be either string or parsed object
  block_number: string;
  block_number_minted: string;
  name: string;
  symbol: string;
  token_hash: string;
  token_uri: string;
  minter_address: string;
  rarity_rank: number | null;
  rarity_percentage: number | null;
  rarity_label: string | null;
  verified_collection: boolean;
  possible_spam: boolean;
  collection_logo: string;
  collection_banner_image: string;
  floor_price: number | null;
  floor_price_usd: number | null;
  floor_price_currency: string | null;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  properties?: {
    number?: number;
    name?: string;
  };
  is_normalized?: boolean;
  attributes?: NFTAttribute[];
  url?: string;
  last_request_date?: number;
  version?: number;
  background_image?: string;
  image_url?: string;
}

export interface NFTAttribute {
  trait_type: string;
  display_type?: 'date' | 'number' | 'string';
  value: string | number;
}

export type NFTTokenWithParsedMetadata = Omit<NFTToken, 'metadata'> & {
  metadata: NFTMetadata;
};
