// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
// import { AddressSlice, createAddressSlice } from './slices/address-slice';

import { useExplorerStore } from './useExplorerStore';

// interface StoreState extends AddressSlice {}

// export const useStore = create<StoreState>()(
//   devtools(
//     persist(
//       (...a) => ({
//         ...createAddressSlice(...a),
//       }),
//       {
//         name: 'ethereum-explorer-storage',
//         partialize: (state) => ({
//           currentAddress: state.currentAddress,
//         }),
//       }
//     )
//   )
// );

const useAddress = () => {
  const { currentAddress, setCurrentAddress } = useExplorerStore();
  return { currentAddress };
};
