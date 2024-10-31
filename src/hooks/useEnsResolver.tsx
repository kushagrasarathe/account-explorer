import { publicClient } from '@/lib/client';
import { useState } from 'react';
import { ControllerRenderProps, useForm, UseFormReturn } from 'react-hook-form';
import { normalize } from 'viem/ens';

export const resolveEns = async (ens: string) => {
  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(ens),
  });
  return ensAddress;
};

const useEnsResolver = (form: UseFormReturn<any>, addressKey: string) => {
  const [resolvedAddress, setResolvedAddress] = useState('');
  const { setValue } = useForm();

  const handleAddressChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any>
  ) => {
    const inputVal = event.target.value;
    if (inputVal.endsWith('.eth')) {
      const resolved = await resolveEns(inputVal);
      if (resolved !== null) {
        setResolvedAddress(resolved);
        form.setValue(addressKey, resolved);
        setValue(field.name, resolved);
      } else {
        setResolvedAddress('');
      }
    } else {
      setResolvedAddress('');
    }
    field.onChange(event);
  };

  return {
    resolvedAddress,
    handleAddressChange,
  };
};

export default useEnsResolver;
