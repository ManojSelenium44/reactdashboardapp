import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestingData } from "@/types/dashboard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Label , LabelList} from "recharts";

interface TestingTypeChartProps {
  data: TestingData[];
  onTestingTypeClick?: (testingType: string) => void;
}

export const TestingTypeChart = ({ data, onTestingTypeClick }: TestingTypeChartProps) => {
  const testingTypeCounts = data.reduce((acc, curr) => {
    acc[curr.testingType] = (acc[curr.testingType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(testingTypeCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const handleBarClick = (entry: any) => {
    if (onTestingTypeClick) {
      onTestingTypeClick(entry.name);
    }
  };

  const COLORS = ['#012E40', '#024959', '#026773', '#659287'];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Testing Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                angle={-20}
                textAnchor="end"
                height={70}
              >
                <Label value="Testing Type" position="insideBottom" offset={-1} 
                                  style={{ fill: '#4B5945', fontWeight: 'bold' }} 
/>
              </XAxis>
              <YAxis tick={false}>
                <Label value="No of Projects" angle={-90} position="insideLeft" 
                                  style={{ fill: '#4B5945', fontWeight: 'bold' }} 
/>
              </YAxis>
              <Tooltip 
                formatter={(value: number) => [`${value}  Support Project(s)`]}
                contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', border: 'none' }}
              />
              <Bar 
                dataKey="value" 
                // fill="#9b87f5"
                onClick={handleBarClick}
                cursor="pointer"
                className="hover:opacity-80 transition-opacity"
              >
                                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}

<LabelList 
                dataKey="value" 
                position="middle" 
                style={{ fill: '#FFFFFF', fontWeight: 'bold' }} 
              />

              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};