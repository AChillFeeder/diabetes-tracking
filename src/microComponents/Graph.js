import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const Graph = ({stats}) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };
    
    
    React.useEffect(() => console.log(stats), [])
    
    const labels = stats.all_timestamps;
    const data = {
        labels,
        datasets: [
            {
            label: 'Poids',
            data: stats.all_weights,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
            label: 'last 10 average weight',
            data: [stats.last_10_average_weight],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return ( 
        <div className='graphContainer'>
            <Line 
            options={options} data={data} />
        </div>
    );
}
 
export default Graph;