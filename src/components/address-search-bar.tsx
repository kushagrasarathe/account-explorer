import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from 'boring-avatars';
import { Clock, Loader2, QrCode, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAddress, useEnsResolver } from 'wagmi';
import { z } from 'zod';
import { ButtonIcon } from './ui/button-icon';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Typography } from './ui/typography';

const addressSchema = z.object({
  address: z
    .string()
    .refine((val) => isAddress(val) || val.endsWith('.eth'), ''),
});

type FormData = z.infer<typeof addressSchema>;

type SearchHistoryItem = {
  address: string;
  ens?: string;
  timestamp: number;
};

export default function AddressSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState<ResolvedAddress>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: '' },
  });

  const isEnsName = inputValue.endsWith('.eth');

  // fetch search history from localStorage
  useEffect(() => {
    try {
      const history = localStorage.getItem('addressSearchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ENS Resolution hooks
  const { data: ensAddress, isLoading: isLoadingEnsAddress } = useEnsAddress({
    name: isEnsName ? normalize(inputValue) : undefined,
    query: { enabled: isEnsName },
  });

  const { data: ensName } = useEnsResolver({
    name: isAddress(inputValue) ? normalize(inputValue) : undefined,
    query: { enabled: isAddress(inputValue) },
  });

  useEffect(() => {
    if (isAddress(inputValue)) {
      setResolvedAddress({ address: inputValue, ens: ensName || undefined });
    } else if (isEnsName && ensAddress) {
      setResolvedAddress({ address: ensAddress, ens: inputValue });
    } else if (!inputValue) {
      setResolvedAddress(null);
    }
  }, [inputValue, ensAddress, ensName, isEnsName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    form.setValue('address', value, { shouldValidate: true });

    if (value === '') {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  };

  const addToSearchHistory = (address: string, ens?: string) => {
    try {
      const newItem: SearchHistoryItem = {
        address,
        ens,
        timestamp: Date.now(),
      };

      const updatedHistory = [newItem, ...searchHistory]
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.address === item.address)
        )
        .slice(0, 5);

      setSearchHistory(updatedHistory);
      localStorage.setItem(
        'addressSearchHistory',
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error('Error saving to search history:', error);
    }
  };

  const onSubmit = (data: FormData) => {
    if (resolvedAddress) {
      addToSearchHistory(resolvedAddress.address, resolvedAddress.ens);
      router.push(`/address/${resolvedAddress.address}`);
    }
  };

  const handleHistoryItemClick = (item: SearchHistoryItem) => {
    setInputValue(item.ens || item.address);
    form.setValue('address', item.ens || item.address, {
      shouldValidate: true,
    });
    setShowHistory(false);
    addToSearchHistory(item.address, item.ens);
    router.push(`/address/${item.address}`);
  };

  const handleAddressClick = (address: string) => {
    if (resolvedAddress) {
      addToSearchHistory(resolvedAddress.address, resolvedAddress.ens);
      router.push(`/address/${address}`);
    }
  };

  const showDropdown = !!inputValue && !form.formState.errors.address;
  const showLoading = isEnsName && !ensAddress && isLoadingEnsAddress;

  return (
    <div className="w-full space-y-2" ref={containerRef}>
      <header className="space-y-2 px-2">
        <Typography variant={'h4'} className="font-bold">
          Enter ETH address or ENS
        </Typography>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="relative">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (!inputValue) {
                            setShowHistory(true);
                          }
                        }}
                        placeholder="e.g: kushagrasarathe.eth"
                        className="h-12 w-full rounded-full border p-3 pl-10 pr-12 tracking-wide text-reown-foreground focus:ring-2 dark:text-reown-1"
                      />
                      <Search
                        className="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2"
                        size={20}
                      />
                      {inputValue && (
                        <ButtonIcon
                          onClick={() => {
                            setInputValue('');
                            setShowHistory(true);
                          }}
                          variant="ghost"
                          icon={X}
                          type="button"
                          className="absolute right-14 top-1/2 h-7 p-0 text-gray-400 -translate-y-1/2 hover:bg-white hover:text-gray-600"
                        />
                      )}
                      <ButtonIcon
                        variant="secondary"
                        icon={QrCode}
                        type="button"
                        className="absolute right-3 top-1/2 h-7 p-2 text-gray-400 -translate-y-1/2 hover:text-gray-600"
                      />
                      {showDropdown && (
                        <ResolvedAddressDropdown
                          resolvedAddress={resolvedAddress}
                          inputValue={inputValue}
                          isLoading={showLoading}
                          onAddressClick={handleAddressClick}
                        />
                      )}
                      {showHistory &&
                        searchHistory.length > 0 &&
                        !showDropdown && (
                          <SearchHistoryDropdown
                            history={searchHistory}
                            onItemClick={handleHistoryItemClick}
                          />
                        )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

function SearchHistoryDropdown({
  history,
  onItemClick,
}: {
  history: SearchHistoryItem[];
  onItemClick: (item: SearchHistoryItem) => void;
}) {
  return (
    <Card className="absolute top-14 w-full rounded-lg border p-1.5 shadow-lg">
      <Typography variant="small" className="px-3 py-2 text-gray-500">
        Recent searches
      </Typography>
      {history.map((item) => (
        <CardContent
          key={item.address}
          onClick={() => onItemClick(item)}
          className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/10"
        >
          <AddressCard address={item.address} ens={item.ens} />

          <Clock className="size-4 text-gray-400" />
        </CardContent>
      ))}
    </Card>
  );
}

type ResolvedAddress = {
  address: string;
  ens?: string;
} | null;

function ResolvedAddressDropdown({
  resolvedAddress,
  inputValue,
  isLoading,
  onAddressClick,
}: {
  resolvedAddress: ResolvedAddress;
  inputValue: string;
  isLoading: boolean;
  onAddressClick: (address: string) => void;
}) {
  return (
    <Card className="absolute top-14 w-full rounded-lg border p-1.5 shadow-lg">
      <CardContent
        onClick={() =>
          resolvedAddress && onAddressClick(resolvedAddress.address)
        }
        className="flex cursor-pointer flex-col items-start px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/10"
      >
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="size-4 animate-spin" />
            <Typography variant={'small'}>Resolving ENS name...</Typography>
          </div>
        ) : (
          <AddressCard
            address={(resolvedAddress?.address || inputValue) ?? 'kushagra.eth'}
            ens={resolvedAddress?.ens}
          />
        )}
      </CardContent>
    </Card>
  );
}

const AddressCard = ({ address, ens }: { address: string; ens?: string }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        name={address ?? 'kushagra.eth'}
        variant="pixel"
        className="size-10 rounded-full shadow-xl"
      />
      <div className="space-y-1">
        {ens && ens !== '0x0000000000000000000000000000000000000000' && (
          <Typography
            variant="small"
            className="font-medium text-blue-600 dark:text-violet-300"
          >
            {ens}
          </Typography>
        )}
        <Typography
          variant="small"
          className="block font-mono font-medium tracking-wide text-gray-600 dark:text-gray-300"
        >
          {address}
        </Typography>
      </div>
    </div>
  );
};
