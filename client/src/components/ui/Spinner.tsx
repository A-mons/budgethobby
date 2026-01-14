import { cn } from '@/utils/cn';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-primary',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-10 w-10': size === 'lg',
        },
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
