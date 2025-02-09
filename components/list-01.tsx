import { cn } from "@/lib/utils"
import { ArrowUpRight, Wallet, SendHorizontal, QrCode, Plus, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AccountItem {
  id: string
  title: string
  description?: string
  balance: string
  type: "savings" | "checking" | "investment" | "debt"
}

interface List01Props {
  totalBalance?: string
  accounts?: AccountItem[]
  className?: string
}

const ACCOUNTS: AccountItem[] = [
  {
    id: "1",
    title: "Main Savings",
    description: "Personal savings",
    balance: "$8,459.45",
    type: "savings",
  },
  {
    id: "2",
    title: "Checking Account",
    description: "Daily expenses",
    balance: "$2,850.00",
    type: "checking",
  },
  {
    id: "3",
    title: "Investment Portfolio",
    description: "Stock & ETFs",
    balance: "$15,230.80",
    type: "investment",
  },
  {
    id: "4",
    title: "Credit Card",
    description: "Pending charges",
    balance: "$1,200.00",
    type: "debt",
  },
]

export default function List01({ totalBalance = "$26,540.25", accounts = ACCOUNTS, className }: List01Props) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Total Balance</p>
        <h2 className="text-2xl font-semibold">{totalBalance}</h2>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center space-x-4">
              <div
                className={cn("p-2 rounded-full", {
                  "bg-green-100 text-green-600": account.type === "savings",
                  "bg-blue-100 text-blue-600": account.type === "checking",
                  "bg-purple-100 text-purple-600": account.type === "investment",
                  "bg-red-100 text-red-600": account.type === "debt",
                })}
              >
                {account.type === "savings" && <Wallet className="h-4 w-4" />}
                {account.type === "checking" && <QrCode className="h-4 w-4" />}
                {account.type === "investment" && <ArrowUpRight className="h-4 w-4" />}
                {account.type === "debt" && <CreditCard className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium">{account.title}</p>
                {account.description && <p className="text-sm text-muted-foreground">{account.description}</p>}
              </div>
            </div>
            <p className="font-medium">{account.balance}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
        <Button variant="outline" className="w-full">
          <SendHorizontal className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
    </div>
  )
}

