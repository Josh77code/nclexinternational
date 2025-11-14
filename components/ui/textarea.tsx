"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-[#676f9d]/30 bg-[#2d3250] px-3 py-2 text-base text-white placeholder:text-white/50 selection:bg-[#9333EA] selection:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9333EA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#424769] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
