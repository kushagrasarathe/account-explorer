import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Camera, QrCode, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ButtonIcon } from './ui/button-icon';

export default function ScanQr() {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        const codeReader = new BrowserQRCodeReader();

        codeReader
          .decodeFromVideoElement(videoRef.current, (result, error) => {
            if (result) {
              const address = result.getText();
              if (address) {
                handleSuccessfulScan(address);
              }
            }
            if (error) {
              console.error('QR Code reading error:', error);
              setError('Failed to read QR code. Please try again.');
            }
          })
          .catch((err) => {
            console.error('QR Code reading error:', err);
            setError('Failed to read QR code. Please try again.');
          });
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };
  const handleSuccessfulScan = (address: string) => {
    stopScanning();
    setOpen(false);
    router.push(`/address/${address}`);
  };

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      stopScanning();
      setError(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonIcon
          variant="secondary"
          icon={QrCode}
          type="button"
          className="absolute right-3 top-1/2 h-7 p-2 text-gray-400 -translate-y-1/2 hover:text-gray-600"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Point your camera at an Ethereum address or ENS name QR code
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <XCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {isScanning ? (
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <video
                ref={videoRef}
                className="h-full w-full rounded-lg object-cover"
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 rounded-lg border-2 border-blue-500" />
            </div>
          ) : (
            <Button onClick={startScanning} className="flex items-center gap-2">
              <Camera size={20} />
              Start Scanning
            </Button>
          )}

          {isScanning && (
            <Button
              variant="destructive"
              onClick={stopScanning}
              className="mt-4"
            >
              Stop Scanning
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
