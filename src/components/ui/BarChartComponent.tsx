// components/ui/BarChartComponent.tsx
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

interface BarChartComponentProps {
  data: ChartData<'bar'>;
}

const BarChartComponent: FC<BarChartComponentProps> = ({ data }) => {
  return <Bar data={data} />;
};

export default BarChartComponent;
