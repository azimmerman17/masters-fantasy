import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = ({labels, backgroundColor, dataSet }) => {

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      responsive: true,
    }
  }

 const data = {
  labels: labels,
  datasets: [
    {
      data: dataSet,
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
      borderWidth: 3,
    },
  ]

 }
  return <Doughnut data={data} options={options} />;
}


export default DoughnutChart

