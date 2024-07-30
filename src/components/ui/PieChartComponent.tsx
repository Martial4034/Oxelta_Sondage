// components/ui/PieChartComponent.tsx
import { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

interface PieChartComponentProps {
  data: ChartData<'pie'>;
}

const PieChartComponent: FC<PieChartComponentProps> = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChartComponent;
