import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { createConfig } from 'wagmi';

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const resolveAddress = (address: `0x${string}`) => {
  const ensName = publicClient.getEnsName({
    address,
  });
  return ensName;
};
