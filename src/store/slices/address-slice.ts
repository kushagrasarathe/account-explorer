import { StateCreator } from 'zustand';
import { Address } from '../types';

export interface AddressSlice {
  currentAddress: Address | null;
  setAddress: (address: string) => void;
}

export const createAddressSlice: StateCreator<AddressSlice> = (set) => ({
  currentAddress: null,
  setAddress: (currentAddress) =>
    set(() => ({
      currentAddress: { currentAddress },
    })),
});
