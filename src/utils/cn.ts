import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge class names with Tailwind CSS conflict resolution
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Re-export clsx for direct usage
export { clsx };
