import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'

ChartJS.register(
    CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend
);

const Chart = ({arr=[],currency,days}) => {
    
    const prices=[]
    const date=[]

    for (let i = 0; i < arr.length; i++) {
        if(days==="24h") 
            date.push(new Date(arr[i][0]).toLocaleTimeString());    
        else
            date.push(new Date(arr[i][0]).toLocaleDateString());  // the time is in milliseconds so we need to convert it

        prices.push(arr[i][1]);
    }

    const data={
        
            labels:date, 
            datasets:[{    // datasets accept an array of objects. The number of datasets sent as objects in the array is equal to the number of charts rendered. Here only one object is sent inside the array so only 1 chart will be rendered
                label:`Price in ${currency}`,
                data:prices,
                borderColor:'rgb(255,99,132)',
                backgroundColor:'rgba(255,99,0.5)'
            }] 
        
    };

  return (
    <Line options={{
        responsive:true 
        }}

        data={data}
    />
    
  )
}

export default Chart
