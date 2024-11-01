'use client';
import { Share2 } from 'lucide-react';
import { useRef } from 'react';
import QRCode from 'react-qr-code';
import { ButtonIcon } from './ui/button-icon';
import { Card } from './ui/card';

function QrCodeGenerator() {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const getCurrentURL = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4" ref={qrCodeRef}>
        <Card className="bg-reown-1 size-fit p-4 shadow-md">
          <QRCode value={getCurrentURL()} className="size-40 dark:invert" />
        </Card>
        <ButtonIcon icon={Share2} variant={'reown-3'} className="w-full">
          Share
        </ButtonIcon>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
