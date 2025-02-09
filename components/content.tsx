import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, Wallet } from "lucide-react"
import List01 from "@/components/list-01"
import List02 from "@/components/list-02"
import List03 from "@/components/list-03"

export default function Content() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Wallet className="w-4 h-4 inline-block mr-2" />
              Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <List01 />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <CreditCard className="w-4 h-4 inline-block mr-2" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <List02 />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Calendar className="w-4 h-4 inline-block mr-2" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <List03 />
        </CardContent>
      </Card>
    </div>
  )
}

