import { CheckCheck, Copy } from 'lucide-react';
import React, { useState } from 'react';
import { ButtonIcon } from './ui/button-icon';

interface CopyToClipboardProps {
  text: string;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <ButtonIcon
      icon={copied ? CheckCheck : Copy}
      onClick={handleCopy}
      variant={'ghost'}
      size={'sm'}
      className="hover:bg-transparent dark:invert"
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    />
  );
};
