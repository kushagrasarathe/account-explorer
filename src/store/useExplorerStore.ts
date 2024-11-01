import {
  EvmWalletHistoryJSON,
  GetWalletNFTsJSONResponse,
} from 'moralis/common-evm-utils';
import { create } from 'zustand';

interface IExplorerStore {
  currentAddress: string | null;
  setCurrentAddress: (address: string | null) => void;
  transactions: EvmWalletHistoryJSON | null;
  setTransactions: (transactions: EvmWalletHistoryJSON) => void;
  nftHoldings: GetWalletNFTsJSONResponse | null;
  setNFTHoldings: (nftHoldings: GetWalletNFTsJSONResponse) => void;
}

export const useExplorerStore = create<IExplorerStore>((set, get) => ({
  currentAddress: null,
  setCurrentAddress: (address: string | null) => {
    set((state) => ({
      ...state,
      currentAddress: address,
    }));
  },

  transactions: null,
  setTransactions: (transactions: EvmWalletHistoryJSON) => {
    set((state) => ({
      ...state,
      transactions: transactions,
    }));
  },

  nftHoldings: null,
  setNFTHoldings: (nftHoldings: GetWalletNFTsJSONResponse) => {
    set((state) => ({
      ...state,
      nftHoldings: nftHoldings,
    }));
  },
}));
