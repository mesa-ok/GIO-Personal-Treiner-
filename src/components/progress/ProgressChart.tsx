
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ProgressChartProps {
  data: {
    name: string;
    value: number;
  }[];
  title: string;
  metric: string;
}

const ProgressChart = ({ data, title, metric }: ProgressChartProps) => {
  return (
    <div className="gio-card">
      <h3 className="gio-subheading">{title}</h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#919191' }} 
              axisLine={{ stroke: '#2D2D2D' }}
            />
            <YAxis 
              tick={{ fill: '#919191' }} 
              axisLine={{ stroke: '#2D2D2D' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1A1A1A',
                border: '1px solid #2D2D2D',
                borderRadius: '8px',
                color: 'white'
              }}
              itemStyle={{ color: '#FF5500' }}
              formatter={(value) => [`${value} ${metric}`, '']}
              labelStyle={{ color: 'white' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FF5500"
              strokeWidth={2}
              activeDot={{ r: 6, fill: '#FF5500' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
