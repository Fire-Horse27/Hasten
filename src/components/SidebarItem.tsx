type SidebarItemProps = {
	label: string
	selected?: boolean
	onClick: () => void
	rightContent?: React.ReactNode
	variant?: 'account' | 'page'
}

export default function SidebarItem({
	label,
	selected = false,
	onClick,
	rightContent,
	variant = 'page',
}: SidebarItemProps) {
	const base =
		variant === 'account'
			? 'w-full flex justify-between items-center px-4 py-0 text-sm text-left transition-colors'
			: 'w-full flex justify-between items-center px-4 py-1.5 text-sm text-left transition-colors'

	const selectedStyles =
		variant === 'account'
			? 'bg-gray-200 font-medium hover:cursor-pointer'
			: 'bg-gray-300 font-semibold hover:cursor-pointer'

	const hoverStyles = 'hover:bg-gray-200 hover:cursor-pointer'

	return (
		<button
			onClick={onClick}
			className={`${base} ${selected ? selectedStyles : hoverStyles}`}
		>
			<span>{label}</span>
			{rightContent}
		</button>
	)
}
