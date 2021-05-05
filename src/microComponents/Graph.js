import React, { useEffect } from 'react'
import { Chart } from 'react-charts';

const Graph = ({values, error}) => {

    let daysProcessedWeight = []
    values.map((day, index) => (
        daysProcessedWeight.push([index, parseFloat(day.weight)])
    ))
    let daysProcessedSugar = []
    values.map((day, index) => (
        daysProcessedSugar.push([index, parseFloat(day.sugar_amount)])
    ))

    const data = React.useMemo(
        () => [
            {
                label: 'Weight',
                data: daysProcessedWeight,
                secondaryAxisID: 'weight'
            },
            {
                label: 'Sugar',
                data: daysProcessedSugar,
                secondaryAxisID: 'sugar'
            },   
        ],
        []
    )

    const axes = React.useMemo(
        () => [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left', id: 'weight', min: 0},
        { type: 'linear', position: 'right', id: 'sugar', min: 0, format: amount => `${amount}%`},
        ],
        []
    )

    return ( 
        <div className="graph">
            <div
            style={{
                width: '100%',
                height: '300px'
            }}>
                <Chart data={data} axes={axes}/>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
     );
}
 
export default Graph;