import { useStore } from '@/store';

export const useAddress = () => {
  return useStore((state) => ({
    setAddress: state.setAddress,
  }));
};
