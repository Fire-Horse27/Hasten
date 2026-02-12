import { useState, useRef, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import TransactionPage from '../components/TransactionContent'

type TransactionLayoutProps = {
	selectedAccountId: string
	setSelectedAccountId: (id: string) => void
	sidebarWidth: number
	setSidebarWidth: React.Dispatch<React.SetStateAction<number>>
}

export default function TransactionLayout({
	selectedAccountId,
	setSelectedAccountId,
	sidebarWidth,
	setSidebarWidth,
}: TransactionLayoutProps) {
	const isResizing = useRef(false)

	useEffect(() => {
		const RIGHT_MIN = 300
		const LEFT_MIN = 150

		setSidebarWidth((prev) => clamp(prev))

		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing.current) return

			setSidebarWidth(clamp(e.clientX))
		}

		const handleMouseUp = () => {
			if (!isResizing.current) return
			isResizing.current = false
			document.body.classList.remove('select-none')
		}

		const handleResize = () => {
			setSidebarWidth((prev) => clamp(prev))
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('resize', handleResize)

		const clamp = (width: number) => {
			const maxWidth = window.innerWidth - RIGHT_MIN
			return Math.max(LEFT_MIN, Math.min(maxWidth, width))
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const startResize = () => {
		isResizing.current = true
		document.body.classList.add('select-none')
	}

	const accounts = [
		{ id: '1', name: 'Checking', balance: 4532.21 },
		{ id: '2', name: 'Savings', balance: 8210.0 },
		{ id: '3', name: 'Visa', balance: -1203.44 },
	]

	const selectedAccount = accounts.find(
		(account) => account.id === selectedAccountId
	)

	const selectedAccountName = selectedAccount?.name ?? ''

	return (
		<div className="h-full flex">
			{/* Sidebar + Resize Handle */}
			<div
				style={{ width: sidebarWidth }}
				className="h-full shrink-0 flex"
			>
				<Sidebar
					accounts={accounts}
					selectedAccountId={selectedAccountId}
					onSelectAccount={setSelectedAccountId}
				/>

				{/* Resize Handle */}
				<div
					onMouseDown={startResize}
					className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400"
				/>
			</div>

			{/* Main Content */}
			<div className="flex-1 min-w-0 p-2 pb-3">
				<TransactionPage
					accountId={selectedAccountId}
					accountName={selectedAccountName}
				/>
			</div>
		</div>
	)
}
