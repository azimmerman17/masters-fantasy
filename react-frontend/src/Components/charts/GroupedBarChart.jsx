import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = ({ dataSet, topLabel, bottomLabel, label }) => {

  const options = {
    plugins: {
      title: {
        display: false,
      },
    },
    responsive: true,
    indexAxis: 'y',
  };
    
  const data = {
    labels: label,
    datasets: [
      {
        label: topLabel,
        data: dataSet.map((datapoint) => datapoint[0]),
        backgroundColor: '#198754', 
        stack: 'Stack 0',
      },
      {
        label: bottomLabel,
        data: dataSet.map((datapoint) => datapoint[1]),
        backgroundColor: '#adb5bd',
        stack: 'Stack 1',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default GroupedBarChart