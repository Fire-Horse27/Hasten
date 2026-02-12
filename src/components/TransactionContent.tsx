import { useMemo } from 'react'
import SectionHeader from '../components/PageHeader'

type Transaction = {
	id: string
	date: string
	payee: string
	category: string
	memo?: string
	amount: number
	balance: number
}

interface TransactionContentProps {
	accountId: string
	accountName: string
}

export default function TransactionContent({
	accountId,
	accountName,
}: TransactionContentProps) {
	// Mock data (replace later with real data)
	const transactions: Transaction[] = useMemo(
		() => [
			{
				id: '1',
				date: '2026-02-01',
				payee: 'Employer Inc.',
				category: 'Salary',
				amount: 2500,
				balance: 2500,
			},
			{
				id: '2',
				date: '2026-02-03',
				payee: 'Walmart',
				category: 'Groceries',
				amount: -145.32,
				balance: 2354.68,
			},
			{
				id: '3',
				date: '2026-02-05',
				payee: 'Electric Company',
				category: 'Utilities',
				amount: -120,
				balance: 2234.68,
			},
		],
		[]
	)

	const currentBalance = transactions.length
		? transactions[transactions.length - 1].balance
		: 0

	return (
		<div className="h-full flex flex-col gap-2">
			{/* Top Bar */}
			<div className="flex items-center justify-between">
				<SectionHeader>{accountName}</SectionHeader>
			</div>

			{/* Transaction Table */}
			<div className="flex-1 overflow-auto border rounded-md">
				<table className="w-full text-sm">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="px-4 py-2">Date</th>
							<th className="px-4 py-2">Payee</th>
							<th className="px-4 py-2">Category</th>
							<th className="px-4 py-2">Memo</th>
							<th className="px-4 py-2 text-right">Amount</th>
							<th className="px-4 py-2 text-right">Balance</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((tx) => (
							<tr
								key={tx.id}
								className="border-t hover:bg-gray-50"
							>
								<td className="px-4 py-2">{tx.date}</td>
								<td className="px-4 py-2">{tx.payee}</td>
								<td className="px-4 py-2">{tx.category}</td>
								<td className="px-4 py-2">{tx.memo || ''}</td>
								<td className="px-4 py-2 text-right">
									{tx.amount.toFixed(2)}
								</td>
								<td className="px-4 py-2 text-right">
									{tx.balance.toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Footer */}
			<div className="flex justify-end">
				<div className="flex font-small gap-2">
					<div>Current Balance: </div>
					<div>${currentBalance.toFixed(2)}</div>
				</div>
			</div>
		</div>
	)
}
