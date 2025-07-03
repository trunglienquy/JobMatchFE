import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {

    return (
      <input
        type={type}
        className={cn(
          'flex h-[4rem] w-full text-dark focus:border-primary-foreground rounded-lg border bg-background px-5 py-2 text-[1.6rem] lg:text-[1.5rem] font-medium file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
          error ? 'border-red-500' : 'border-input',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
