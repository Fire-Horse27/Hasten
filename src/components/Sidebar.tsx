import Button from '../components/Button'

type Page = 'account' | 'calendar' | 'reports' | 'budget' | 'manage'

type SidebarProps = {
	accounts: { id: string; name: string; balance: number }[]
	selectedAccountId: string | null
	selectedPage: Page
	onSelectAccount: (id: string) => void
	onSelectPage: (page: Page) => void
}

export default function Sidebar({
	accounts,
	selectedAccountId,
	selectedPage,
	onSelectAccount,
	onSelectPage,
}: SidebarProps) {
	return (
		<div className="w-64 h-full bg-gray-100 border-r flex flex-col">
			{/* Accounts Section */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-3 text-xs font-semibold text-gray-500">
					ACCOUNTS
				</div>

				{accounts.map((acct) => (
					<button
						key={acct.id}
						onClick={() => onSelectAccount(acct.id)}
						className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-200 ${
							selectedAccountId === acct.id &&
							selectedPage === 'account'
								? 'bg-gray-200 font-medium'
								: ''
						}`}
					>
						<div className="flex justify-between">
							<span>{acct.name}</span>
							<span>{acct.balance.toFixed(2)}</span>
						</div>
					</button>
				))}
			</div>

			{/* App Navigation Section */}
			<div className="border-t">
				{['calendar', 'reports', 'budget', 'manage'].map((page) => (
					// <button
					// 	key={page}
					// 	onClick={() => onSelectPage(page as Page)}
					// 	className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-200 ${
					// 		selectedPage === page
					// 			? 'bg-gray-200 font-medium'
					// 			: ''
					// 	}`}
					// >
					// 	{page.charAt(0).toUpperCase() + page.slice(1)}
					// </button>
					<Button
						variant="primary"
						onClick={() => onSelectPage(page as Page)}
					>
						{page.charAt(0).toUpperCase() + page.slice(1)}
					</Button>
				))}
			</div>
		</div>
	)
}
