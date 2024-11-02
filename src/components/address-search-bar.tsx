import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from 'boring-avatars';
import { Loader2, QrCode, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAddress, useEnsAvatar, useEnsResolver } from 'wagmi';
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

export default function AddressSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState<ResolvedAddress>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { address: '' },
  });

  const isEnsName = inputValue.endsWith('.eth');

  // ENS Resolution hooks
  const { data: ensAddress, isLoading: isLoadingEnsAddress } = useEnsAddress({
    name: isEnsName ? normalize(inputValue) : undefined,
    query: { enabled: isEnsName },
  });

  const { data: ensName } = useEnsResolver({
    name: isAddress(inputValue) ? normalize(inputValue) : undefined,
    query: { enabled: isAddress(inputValue) },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: isAddress(inputValue) ? normalize(inputValue) : undefined,
    chainId: 1,
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
  };

  const onSubmit = (data: FormData) => {
    if (resolvedAddress) {
      console.log('Form submitted:', { ...data, resolvedAddress });
    }
  };

  const showDropdown = !!inputValue && !form.formState.errors.address;
  const showLoading = isEnsName && !ensAddress && isLoadingEnsAddress;

  return (
    <div className="w-full space-y-2">
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
                        placeholder="e.g: kushagrasarathe.eth"
                        className="text-reown-foreground dark:text-reown-1 h-12 w-full rounded-full border p-3 pl-10 pr-12 tracking-wide focus:ring-2"
                      />
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      {inputValue && (
                        <ButtonIcon
                          onClick={() => setInputValue('')}
                          variant="ghost"
                          icon={X}
                          type="button"
                          className="absolute right-14 top-1/2 h-7 -translate-y-1/2 p-0 text-gray-400 hover:bg-white hover:text-gray-600"
                        />
                      )}
                      <ButtonIcon
                        variant="secondary"
                        icon={QrCode}
                        type="button"
                        className="absolute right-3 top-1/2 h-7 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                      />
                      {showDropdown && (
                        <ResolvedAddressDropdown
                          resolvedAddress={resolvedAddress}
                          inputValue={inputValue}
                          isLoading={showLoading}
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

type ResolvedAddress = {
  address: string;
  ens?: string;
} | null;

function ResolvedAddressDropdown({
  resolvedAddress,
  inputValue,
  isLoading,
}: {
  resolvedAddress: ResolvedAddress;
  inputValue: string;
  isLoading: boolean;
}) {
  const router = useRouter();
  return (
    <Card className="absolute top-14 w-full rounded-lg border p-1.5 shadow-lg">
      <CardContent
        onClick={() => router.push(`/address/${resolvedAddress?.address}`)}
        className="flex cursor-pointer flex-col items-start px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/10"
      >
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="size-4 animate-spin" />
            <Typography variant={'small'}>Resolving ENS name...</Typography>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar
              name={(resolvedAddress?.address || inputValue) ?? 'kushagra.eth'}
              variant="pixel"
              className="size-10 rounded-full shadow-xl"
            />
            <div className="space-y-1">
              {resolvedAddress?.ens &&
                resolvedAddress.ens !==
                  '0x0000000000000000000000000000000000000000' && (
                  <Typography
                    variant="small"
                    className="font-medium text-blue-600 dark:text-violet-300"
                  >
                    {resolvedAddress.ens}
                  </Typography>
                )}
              <Typography
                variant="small"
                className="block font-mono font-medium tracking-wide text-gray-600 dark:text-gray-300"
              >
                {resolvedAddress?.address || inputValue}
              </Typography>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
