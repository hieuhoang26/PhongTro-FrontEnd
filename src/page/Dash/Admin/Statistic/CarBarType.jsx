import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { statisticApi } from "../../../../api/statistic";

export const CardBarType = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await statisticApi.getPostByType();
        const labels = response.data.data.map((item) => item.label);
        const values = response.data.data.map((item) => item.count);

        const ctx = chartRef.current.getContext("2d");

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Bài đăng",
                data: values,
                backgroundColor: "#4c51bf",
                borderRadius: 5,
                barThickness: 40,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#4a5568",
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#4a5568",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "#4a5568",
                  stepSize: 20,
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch data", error);
        return [];
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 w-full h-[400px]">
      <h6 className="text-xl font-semibold text-gray-800 mb-4">
        Thống kê bài đăng theo loại
      </h6>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
