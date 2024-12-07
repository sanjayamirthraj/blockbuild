import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'selected' | 'icon' | 'standard'
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md text-sm font-medium transition-colors',
        {
          'px-4 py-2 text-[#EDEDED] hover:bg-[#2C2E334D]/30': variant === 'default',
          'px-4 py-2 bg-[#2C2E334D]/30 text-[#EDEDED]': variant === 'selected',
          'px-4 py-2 bg-[#242424] text-white border border-[#5A5A5A]': variant === 'standard',
          'h-10 w-10 flex items-center justify-center text-gray-400 hover:bg-[#1A1B18] hover:text-white': variant === 'icon',
        },
        className
      )}
      {...props}
    />
  )
} 