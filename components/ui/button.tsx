import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 gap-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-md hover:shadow-lg hover:scale-105',
        destructive:
          'bg-[var(--danger)] text-white hover:bg-red-700 shadow-md hover:shadow-lg hover:scale-105',
        success:
          'bg-[var(--success)] text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:scale-105',
        warning:
          'bg-[var(--warning)] text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:scale-105',
        outline:
          'bg-white border border-[var(--border)] text-[var(--text-primary)] hover:bg-blue-50 shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90',
        ghost:
          'hover:bg-primary/10 text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3 text-sm',
        sm: 'h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5 text-sm',
        lg: 'h-10 rounded-full px-6 has-[>svg]:px-4 text-base',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
