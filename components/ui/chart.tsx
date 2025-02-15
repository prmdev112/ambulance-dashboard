import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer as RechartsResponsiveContainer,
} from "recharts"

export const BarChartComponent = ({ data, width, height }: { data: any[]; width: number; height: number }) => (
  <RechartsResponsiveContainer width={width} height={height}>
    <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <RechartsXAxis dataKey="name" />
      <RechartsYAxis />
      <Tooltip />
      <Legend />
      <RechartsBar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
    </RechartsBarChart>
  </RechartsResponsiveContainer>
)

export const Bar = RechartsBar
export const BarChart = BarChartComponent
export const ResponsiveContainer = RechartsResponsiveContainer
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis

