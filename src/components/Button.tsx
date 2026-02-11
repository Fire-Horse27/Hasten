import { ReactNode } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

type ButtonProps = {
	children: ReactNode
	onClick?: () => void
	variant?: Variant
	className?: string
	disabled?: boolean
}

export default function Button({
	children,
	onClick,
	variant = 'primary',
	className,
	disabled = false,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				'px-4 py-2 text-sm font-medium rounded-md transition-colors',
				'focus:outline-none focus:ring-2 focus:ring-offset-1',
				{
					'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500':
						variant === 'primary',
					'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400':
						variant === 'secondary',
					'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500':
						variant === 'danger',
					'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400':
						variant === 'ghost',
					'opacity-50 cursor-not-allowed': disabled,
				},
				className
			)}
		>
			{children}
		</button>
	)
}
