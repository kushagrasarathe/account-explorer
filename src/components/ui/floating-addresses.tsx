import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Typography } from './typography';

const FloatingAddresses = () => {
  const [addresses, setAddresses] = useState<
    Array<{
      id: number;
      address: string;
      zone: { x: number; y: number };
      moveDelay: number;
      movementRange: { x: number; y: number };
    }>
  >([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sampleAddresses = [
    'kushagrasarathe.eth',
    'vitalik.eth',
    'ethereum.eth',
    'wallet.eth',
    'defi.eth',
    'nft.eth',
    'dao.eth',
    'web3.eth',
    'crypto.eth',
    'blockchain.eth',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const zones = [];
    const gridSize = 6;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        zones.push({
          x: (window.innerWidth / gridSize) * i,
          y: (window.innerHeight / gridSize) * j,
        });
      }
    }

    const shuffledZones = [...zones].sort(() => Math.random() - 0.5);
    const usedZones = new Set();

    const newAddresses = Array.from({ length: 35 }, (_, i) => {
      let zone;
      do {
        zone = shuffledZones[Math.floor(Math.random() * shuffledZones.length)];
      } while (usedZones.has(`${zone.x},${zone.y}`));

      usedZones.add(`${zone.x},${zone.y}`);

      return {
        id: i,
        address: sampleAddresses[i % sampleAddresses.length],
        zone: zone,
        moveDelay: Math.random() * 3,
        movementRange: {
          x: 100 + Math.random() * 150,
          y: 100 + Math.random() * 150,
        },
      };
    });

    setAddresses(newAddresses);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden blur-sm">
      {addresses.map((item) => {
        const zoneWidth = window.innerWidth / 6;
        const zoneHeight = window.innerHeight / 6;

        const parallaxX = mousePosition.x * -50;
        const parallaxY = mousePosition.y * -50;

        return (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0.5,
              x: item.zone.x + (Math.random() - 0.5) * zoneWidth * 0.8,
              y: item.zone.y + (Math.random() - 0.5) * zoneHeight * 0.8,
            }}
            animate={{
              opacity: [1],
              x: [
                item.zone.x +
                  (Math.random() - 0.5) * item.movementRange.x +
                  parallaxX,
                item.zone.x +
                  (Math.random() - 0.5) * item.movementRange.x +
                  parallaxX,
                item.zone.x +
                  (Math.random() - 0.5) * item.movementRange.x +
                  parallaxX,
                item.zone.x +
                  (Math.random() - 0.5) * item.movementRange.x +
                  parallaxX,
              ],
              y: [
                item.zone.y +
                  (Math.random() - 0.5) * item.movementRange.y +
                  parallaxY,
                item.zone.y +
                  (Math.random() - 0.5) * item.movementRange.y +
                  parallaxY,
                item.zone.y +
                  (Math.random() - 0.5) * item.movementRange.y +
                  parallaxY,
                item.zone.y +
                  (Math.random() - 0.5) * item.movementRange.y +
                  parallaxY,
              ],
            }}
            transition={{
              duration: 15 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.moveDelay,
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="absolute cursor-pointer whitespace-nowrap rounded-xl border px-6 py-2 text-black/80 transition-all duration-300 hover:z-[1000] hover:border-2 hover:border-reown-2/40 hover:bg-reown-2/50 hover:text-reown-2 hover:shadow-lg dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-900"
          >
            <Typography variant={'smallTitle'}>{item.address}</Typography>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingAddresses;
