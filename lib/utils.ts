
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
  if (price < 200_000) return 49_000;
  if (price >= 200_000 && price < 500_000) return 99_000;
  if (price >= 500_000 && price < 700_000) return 149_000;
  if (price >= 700_000 && price < 1_000_000) return 179_000;
  if (price >= 1_000_000 && price < 1_500_000) return 249_000;
  if (price >= 1_500_000 && price < 2_000_000) return 299_000;
  if (price >= 2_000_000 && price < 2_500_000) return 349_000;
  if (price >= 2_500_000 && price < 3_000_000) return 500_000;
  if (price >= 3_000_000 && price < 3_500_000) return 649_000;
  if (price >= 3_500_000 && price < 4_000_000) return 749_000;
  if (price >= 4_000_000 && price < 4_500_000) return 849_000;
  if (price >= 4_500_000 && price < 5_000_000) return 949_000;
  if (price >= 5_000_000 && price < 5_500_000) return 1_049_000;
  if (price >= 5_500_000 && price < 6_000_000) return 1_149_000;
  if (price >= 6_000_000 && price < 6_500_000) return 1_249_000;
  if (price >= 6_500_000 && price < 7_000_000) return 1_300_000;
  if (price >= 7_000_000 && price < 7_500_000) return 1_400_000;
  if (price >= 7_500_000 && price < 8_000_000) return 1_500_000;
  if (price >= 8_000_000 && price < 8_500_000) return 1_600_000;
  if (price >= 8_500_000 && price < 9_000_000) return 1_700_000;
  if (price >= 9_000_000 && price < 9_500_000) return 1_800_000;
  if (price >= 9_500_000 && price < 10_000_000) return 1_900_000;



  return 0; // ngoài range thì k cọc
}
