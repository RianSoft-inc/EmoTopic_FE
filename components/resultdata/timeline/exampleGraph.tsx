// components/TopicGraph.tsx

"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React from "react";

// Dynamically import ApexCharts with SSR disabled for Next.js compatibility
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the props interface for type safety and IntelliSense in TypeScript
interface TopicGraphProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  type: string;
  highestPercentageUser: string;
}

// Functional component for the Topic Graph using TypeScript
const TopicGraph: React.FC<TopicGraphProps> = ({
  series,
  categories,
  highestPercentageUser,
}) => {
  const colors = series.map((s) =>
    // #b29cf0
    s.name === highestPercentageUser ? "#f07ff6" : "#f0edf9"
  );
  const fontColors = series.map((s) =>
    s.name === highestPercentageUser ? "#000000" : "#000000"
  );
  // Chart configuration options using ApexOptions type for type safety
  const options: ApexOptions = {
    chart: {
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 0.5,
        opacity: 0.5,
      },
      type: "bar", // Define the chart type
      height: 350, // Set the height of the chart
      zoom: {
        enabled: true, // Enable zooming feature on the chart
      },
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: "#f4f0f0",
      row: {
        opacity: 10,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontWeight: 100,
        },
      },
    },
    xaxis: {
      categories: categories, // Set the categories for the x-axis from props
      labels: {
        style: {
          fontWeight: 100,
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        color: "#ebe1f3b9",
      },
      tooltip: {
        enabled: false,
      },
    },
    title: {
      text: "당신이 상대방과 메시지를 나눈 횟수는?", // Chart title
      align: "center", // Align the title to the left
    },
    tooltip: {
      enabled: true, // Enable tooltips
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y + " 건";
          }
          return "";
        },
      },
    },

    dataLabels: {
      enabled: true,
      style: {
        colors: fontColors,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: "end",
        dataLabels: {
          position: "top",
        },
      },
    },

    fill: {
      colors: colors,
    },
    legend: {
      show: true,
      markers: {
        shape: "sparkle",
        fillColors: colors,
      },
    },
  };

  // Render the ApexChart component with the provided options and series
  return (
    <div className="w-3/5 shadow-lg rounded-lg bg-white">
      <ApexChart options={options} series={series} type="bar" />
    </div>
  );
};

export default TopicGraph;
