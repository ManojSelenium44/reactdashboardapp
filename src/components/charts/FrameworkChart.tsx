import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestingData } from "@/types/dashboard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";
import { useNavigate } from "react-router-dom";

interface FrameworkChartProps {
  data: TestingData[];
  onFrameworkClick?: (framework: string) => void;
}

export const FrameworkChart = ({ data, onFrameworkClick }: FrameworkChartProps) => {
  const frameworkCounts = data.reduce((acc, curr) => {
    acc[curr.frameworkType] = (acc[curr.frameworkType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(frameworkCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#012E40', '#024959', '#026773', '#659287'];

  const handlePieClick = (entry: any) => {
    if (onFrameworkClick) {
      onFrameworkClick(entry.name);
    }
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Framework Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onClick={handlePieClick}
                cursor="pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} Support Project(s)`, name]}
                contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', border: 'none' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                onClick={handlePieClick}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};