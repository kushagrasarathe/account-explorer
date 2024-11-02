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
        <Card className="rounded-2xl bg-reown-1 p-4 shadow-xl lg:size-fit">
          <QRCode
            value={getCurrentURL()}
            className="size-full dark:invert lg:size-40"
          />
        </Card>
        <ButtonIcon icon={Share2} variant={'reown-2'} className="w-full">
          Share
        </ButtonIcon>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
