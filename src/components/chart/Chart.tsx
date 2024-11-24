import { FC } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

interface IChartProps {
  totalIncome: number;
  totalExpense: number;
}

interface IChartData {
  value: number;
  name: string;
}

const COLORS = ['#00C49F', '#FF8042'];

const Chart: FC<IChartProps> = ({ totalIncome, totalExpense }) => {
  const data: IChartData[] = [
    {
      value: totalExpense,
      name: 'Расходы',
    },
    {
      value: totalIncome,
      name: 'Доходы',
    },
  ];

  return (
    <PieChart width={240} height={240}>
      <Pie
        data={data}
        cx={'50%'}
        cy={'50%'}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
};

export default Chart;
