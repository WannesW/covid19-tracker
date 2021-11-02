import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from "numeral";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
}


function LineGraph({ casesType = 'cases' }) {
  const [data, setData] = useState({})

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = []
    let lastDataPoint
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[casesType][date]
    }
    return chartData
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
          let chartData = buildChartData(data, "cases")

          setData(chartData)
        })
    }
    fetchData()
  }, [casesType])

  return (
    <div>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: '#18a89b',
                borderColor: "#18a89b",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph
