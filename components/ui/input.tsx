import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 border-none focus:outline-none w-full rounded-md  bg-[#1b1b1b] px-3 py-2 text-sm placeholder:text-sm focus-visible:outline-[#ffffff1f] focus:outline-[#ffffff1f] placeholder:text-[#9B9B9B]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
