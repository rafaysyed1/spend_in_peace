import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  CreditCard,
  type LucideIcon,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  title: string
  amount: string
  type: "incoming" | "outgoing"
  category: string
  icon: LucideIcon
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface List02Props {
  transactions?: Transaction[]
  className?: string
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Apple Store Purchase",
    amount: "$999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "Today, 2:45 PM",
    status: "completed",
  },
  {
    id: "2",
    title: "Salary Deposit",
    amount: "$4,500.00",
    type: "incoming",
    category: "income",
    icon: Wallet,
    timestamp: "Today, 9:00 AM",
    status: "completed",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: "$15.99",
    type: "outgoing",
    category: "entertainment",
    icon: CreditCard,
    timestamp: "Yesterday",
    status: "pending",
  },
]

export default function List02({ transactions = TRANSACTIONS, className }: List02Props) {
  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-muted">
                <transaction.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">{transaction.title}</p>
                <p className="text-sm text-muted-foreground">{transaction.timestamp}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p
                className={cn("font-medium", {
                  "text-green-600": transaction.type === "incoming",
                  "text-red-600": transaction.type === "outgoing",
                })}
              >
                {transaction.type === "incoming" ? "+" : "-"}
                {transaction.amount}
              </p>
              {transaction.type === "incoming" ? (
                <ArrowDownLeft className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-red-600" />
              )}
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-4">
        View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

