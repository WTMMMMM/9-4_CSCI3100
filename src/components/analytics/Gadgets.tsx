import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from "react"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: { // 'yAxes' is now just 'y' in Chart.js 3.x
        beginAtZero: true,
        max: 40,
        min: 0,
        ticks: {
            stepSize: 10
        }
    }
},
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gadgets',
    },
  },
};




function Gadgets(props:any){
    
return(<div><Line options={options} data={props.data} /></div>)
}

export default Gadgets