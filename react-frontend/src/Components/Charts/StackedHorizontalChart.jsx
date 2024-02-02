import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend );


const StackedHorizontalChart = ({ yLabels, xLabels, backgroundColor, dataSet }) => {

  console.log('yy', dataSet)

  const options = {
    indexAxis: 'y',
      plugins: {
        legend: {
          position: 'bottom',
          // display: false,
        },
      },         
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            display: false,
            stepSize: 18
          }
        },
        y: {
          stacked: true,  
          ticks: {
            display: true,
          }
        }
      }
    }

    console.log(dataSet.map(set => set[0]))
    
    const data = {
      labels: yLabels,
      datasets: [{
        label: xLabels[0],
        data: dataSet.map(set => set[0]),
        backgroundColor: backgroundColor[0],
      },{
        label: xLabels[1],
        data: dataSet.map(set => set[1]),
        backgroundColor: backgroundColor[1],
      },{
        label: xLabels[2],
        data: dataSet.map(set => set[2]),
        backgroundColor: backgroundColor[2],
      },{
        label: xLabels[3],
        data: dataSet.map(set => set[3]),
        backgroundColor: backgroundColor[3],
      },{
        label: xLabels[4],
        data: dataSet.map(set => set[4]),
        backgroundColor: backgroundColor[4],
      }]
    }
  
  return <Bar options={options} data={data} />;
}

export default StackedHorizontalChart
