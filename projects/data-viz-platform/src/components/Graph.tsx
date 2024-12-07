import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { ArrowUp } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'

const data = [
  { month: 'Apr', value: 35000, change: 2.3 },
  { month: 'May', value: 45000, change: 4.6 },
  { month: 'Jun', value: 40000, change: 3.1 },
  { month: 'Jul', value: 80000, change: 5.8 },
  { month: 'Aug', value: 60000, change: 4.2 },
  { month: 'Sep', value: 45000, change: 3.7 },
  { month: 'Oct', value: 65000, change: 4.9 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#222324] border border-[#525252] rounded-lg p-4">
        <p className="text-[32px] font-bold text-white">
          ${(payload[0].value / 1000).toFixed(2)}k
        </p>
        <div className="flex items-center gap-2 text-[#999999]">
          <ArrowUp className="text-[#C9FF3B] h-4 w-4" />
          <span>{payload[0].payload.change}% above target</span>
        </div>
      </div>
    )
  }
  return null
}

export function Graph() {
  const currentMonth = 'May'

  return (
    <div className="rounded-lg border border-[#444444] bg-[#222324] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Graphs</h3>
        <Select defaultValue="unsatisfied">
          <SelectTrigger className="w-[237px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unsatisfied">Unsatisfied Demand %</SelectItem>
            <SelectItem value="satisfied">Satisfied Demand %</SelectItem>
            <SelectItem value="total">Total Demand</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[449px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 80, right: 40, left: 10, bottom: 20 }}
          >
            <CartesianGrid 
              vertical={true}
              horizontal={true}
              strokeDasharray="3 3"
              stroke="#333333"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="month"
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#ffffff', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#ffffff', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}K`}
              dx={-20}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#525252', strokeDasharray: '3 3' }}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke="#C9FF3B"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#C9FF3B' }}
              isAnimationActive={false}
              dot={(props: any) => {
                const { cx, cy, payload } = props
                if (payload.month === currentMonth) {
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#C9FF3B"
                    />
                  )
                }
                return null
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 