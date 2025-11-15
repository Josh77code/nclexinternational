import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-white placeholder:text-white/50 selection:bg-[#0A61C9] selection:text-white bg-[#2d3250] border-[#749DC8]/30 dark:border-[#334155] flex h-9 w-full min-w-0 rounded-md border text-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-[#0A61C9] dark:focus-visible:border-[#60A5FA] focus-visible:ring-[#0A61C9]/50 dark:focus-visible:ring-[#60A5FA]/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
