import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  iconStyle?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, iconStyle, className, type, ...props }, ref) => {
    const IconElement = icon;
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-100",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {IconElement && <IconElement className={cn(
            "text-foreground",
            iconStyle
          )} />}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }