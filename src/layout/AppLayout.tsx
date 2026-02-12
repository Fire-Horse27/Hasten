import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import type { Page } from '../types/navigation'

export default function AppLayout() {
	const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
		'1'
	)
	const [selectedPage, setSelectedPage] = useState<Page>('manage')

	const accounts = [
		{ id: '1', name: 'Checking', balance: 4532.21 },
		{ id: '2', name: 'Savings', balance: 8210.0 },
		{ id: '3', name: 'Visa', balance: -1203.44 },
	]

	return (
		<div className="h-full flex">
			<Sidebar
				accounts={accounts}
				selectedAccountId={selectedAccountId}
				selectedPage={selectedPage}
				onSelectAccount={(id) => {
					setSelectedAccountId(id)
				}}
				onSelectPage={(page) => {
					setSelectedPage(page)
				}}
			/>

			<div className="flex-1 p-6">
				<h1 className="text-xl font-semibold">
					{selectedAccountId
						? `${selectedPage} — Account ${selectedAccountId}`
						: selectedPage}
				</h1>
			</div>
		</div>
	)
}
