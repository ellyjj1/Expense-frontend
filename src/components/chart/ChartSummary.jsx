import React from 'react'
import Chart from "react-apexcharts";
import { Box } from '@chakra-ui/react'; // Import Box from Chakra UI

const options = {
  labels: ["Income", "Expense"],
  colors: ["#213ebf","#FD5E53"],
  chart: {
    width: "100%", 
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#213ebf","#FD5E53"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000",
    },
  },
};

export default function ChartSummary({expense, income}) {
  return (
    <Box width="250px" height="250px"> 
      <Chart
        options={options}
        series={[income, expense]}
        type="donut"
        width="100%"
        height="100%"
      />
    </Box>
  )
}
