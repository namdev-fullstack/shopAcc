
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

// utils/deposit.ts
export function getDeposit(price: number): number {
  if (price >= 200_000 && price < 500_000) return 100_000;
  if (price >= 500_000 && price < 1_000_000) return 200_000;
  if (price >= 1_000_000 && price < 2_000_000) return 300_000;
  if (price >= 2_000_000 && price < 3_000_000) return 400_000;
  if (price >= 3_000_000 && price < 4_000_000) return 500_000;
  if (price >= 4_000_000 && price < 5_000_000) return 600_000;
  if (price >= 5_000_000 && price < 6_000_000) return 700_000;
  if (price >= 6_000_000 && price < 7_000_000) return 800_000;
  if (price >= 7_000_000 && price < 8_000_000) return 900_000;
  if (price >= 8_000_000 && price < 9_000_000) return 1_000_000;
  if (price >= 9_000_000 && price < 10_000_000) return 1_100_000;



  return 0; // ngoài range thì k cọc
}
