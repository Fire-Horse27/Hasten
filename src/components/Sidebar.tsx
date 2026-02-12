import SidebarItem from './SidebarItem'
import type { Page } from '../types/navigation'
import { pages } from '../types/navigation'

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
		<div className="w-45 h-full bg-gray-100 border-r flex flex-col">
			{/* Accounts Section */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-3 text-xs font-semibold text-gray-500">
					ACCOUNTS
				</div>

				{accounts.map((acct) => (
					<SidebarItem
						key={acct.id}
						label={acct.name}
						selected={selectedAccountId === acct.id}
						onClick={() => onSelectAccount(acct.id)}
						variant="account"
						rightContent={<span>{acct.balance.toFixed(2)}</span>}
					/>
				))}
			</div>

			{/* App Navigation Section */}
			<div className="border-t">
				{pages.map((page) => (
					<SidebarItem
						key={page}
						label={page.charAt(0).toUpperCase() + page.slice(1)}
						selected={selectedPage === page}
						onClick={() => onSelectPage(page)}
						variant="page"
					/>
				))}
			</div>
		</div>
	)
}
