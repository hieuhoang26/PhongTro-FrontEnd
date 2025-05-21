import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { statisticApi } from "../../../../api/statistic";
Chart.register(...registerables);

export function CardLineChart() {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await statisticApi.getPostByDate();
        const data = response.data.data || [];

        const labels = data.map((item) =>
          new Date(item.date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          })
        );
        const values = data.map((item) => item.postCount);

        const ctx = document.getElementById("line-chart").getContext("2d");

        if (chartInstance) {
          chartInstance.destroy();
        }

        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Bài đăng",
                data: values,
                fill: false,
                borderColor: "#4c51bf",
                backgroundColor: "#4c51bf",
                tension: 0.3,
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
                  color: "#4B5563", // text-gray-600
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            interaction: {
              mode: "nearest",
              intersect: false,
            },
            scales: {
              x: {
                ticks: {
                  color: "#4B5563", // text-gray-600
                },
                grid: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.05)", // light gray
                },
              },
              y: {
                ticks: {
                  color: "#4B5563", // text-gray-600
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
              },
            },
          },
        });

        setChartInstance(newChart);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchData();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="text-gray-700 text-xl font-semibold">
              Bài đăng theo ngày
            </h6>
          </div>
        </div>
      </div>

      <div className="p-4 flex-auto">
        <div className="relative h-72">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
