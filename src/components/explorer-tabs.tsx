'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentType } from 'react';
import NFTHoldings from './nft-holdings';
import TokenHoldingsTable from './token-holdings';
import TransactionHistoryTable from './transaction-history';

type TTabsData = {
  title: string;
  tabValue: string;
  tabContent: ComponentType;
}[];

export const tabsData: TTabsData = [
  {
    title: 'Transactions',
    tabValue: 'transactions',
    tabContent: TransactionHistoryTable,
  },
  {
    title: 'Token Holdings',
    tabValue: 'token-holdings',
    tabContent: TokenHoldingsTable,
  },
  {
    title: 'NFT Holdings',
    tabValue: 'nft-holdings',
    tabContent: NFTHoldings,
  },
];
export default function ExplorerTabs() {
  return (
    <Tabs defaultValue={'transactions'} className="space-y-6">
      <TabsList className="flex w-max justify-start overflow-auto">
        {tabsData.map((tab, idx) => (
          <TabsTrigger key={idx} value={tab.tabValue}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsData.map(({ title, tabValue, tabContent: TabContent }, idx) => (
        <TabsContent key={idx} value={tabValue}>
          {TabContent && <TabContent />}
        </TabsContent>
      ))}
    </Tabs>
  );
}
