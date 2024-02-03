import { computeStyles } from '@popperjs/core';
import { Chart as ChartJS,  RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({ labels, backgroundColor, dataSet, max }) => {

  console.log(dataSet)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      r: {
        ticks: {
          stepSize: max / 4
        },
        max: max
      }
    }
  }


  const data = {
    labels: labels, 
    datasets: [
      {
        data: dataSet,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return <PolarArea data={data} options={options} />
}

export default PolarAreaChart