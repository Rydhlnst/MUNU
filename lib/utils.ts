import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberWithDot(value: string): string {
  const num = value.replace(/\D/g, ""); // hanya angka
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
