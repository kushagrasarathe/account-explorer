'use client';

import { useExplorerStore } from '@/store/useExplorerStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function WalletStats() {
  const { currentAddress } = useExplorerStore();
  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>{currentAddress}</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-normal p-4">
        <img
          src={`https://effigy.im/a/${currentAddress}.png`}
          className="size-40 rounded-full shadow-md"
        />
      </CardContent>
    </Card>
  );
}
