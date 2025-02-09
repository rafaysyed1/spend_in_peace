import { cn } from "@/lib/utils"
import {
  Calendar,
  type LucideIcon,
  ArrowRight,
  CheckCircle2,
  Timer,
  AlertCircle,
  PiggyBank,
  TrendingUp,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ListItem {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconStyle: string
  date: string
  time?: string
  amount?: string
  status: "pending" | "in-progress" | "completed"
  progress?: number
}

interface List03Props {
  items?: ListItem[]
  className?: string
}

const iconStyles = {
  savings: "bg-green-100 text-green-600",
  investment: "bg-purple-100 text-purple-600",
  debt: "bg-red-100 text-red-600",
}

const statusConfig = {
  pending: {
    icon: Timer,
    class: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-blue-600",
    bg: "bg-blue-100",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-green-600",
    bg: "bg-green-100",
  },
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Emergency Fund",
    subtitle: "3 months of expenses saved",
    icon: PiggyBank,
    iconStyle: "savings",
    date: "Target: Dec 2024",
    amount: "$15,000",
    status: "in-progress",
    progress: 65,
  },
  {
    id: "2",
    title: "Stock Portfolio",
    subtitle: "Tech sector investment plan",
    icon: TrendingUp,
    iconStyle: "investment",
    date: "Target: Jun 2024",
    amount: "$50,000",
    status: "pending",
    progress: 30,
  },
  {
    id: "3",
    title: "Debt Repayment",
    subtitle: "Student loan payoff plan",
    icon: CreditCard,
    iconStyle: "debt",
    date: "Target: Mar 2025",
    amount: "$25,000",
    status: "in-progress",
    progress: 45,
  },
]

export default function List03({ items = ITEMS, className }: List03Props) {
  return (
    <div className={cn("w-full overflow-auto", className)}>
      <div className="flex space-x-4 pb-4">
        {items.map((item) => (
          <div key={item.id} className="w-[300px] flex-none p-4 rounded-lg border bg-card text-card-foreground">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("p-2 rounded-full", iconStyles[item.iconStyle as keyof typeof iconStyles])}>
                <item.icon className="h-4 w-4" />
              </div>
              <div
                className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  statusConfig[item.status].bg,
                  statusConfig[item.status].class,
                )}
              >
                {item.status}
              </div>
            </div>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{item.subtitle}</p>
            {typeof item.progress === "number" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            )}
            {item.amount && (
              <p className="mt-4 font-semibold">
                {item.amount} <span className="text-sm font-normal text-muted-foreground">target</span>
              </p>
            )}
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{item.date}</span>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

