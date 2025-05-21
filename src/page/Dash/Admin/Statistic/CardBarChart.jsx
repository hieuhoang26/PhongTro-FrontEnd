import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { statisticApi } from "../../../../api/statistic";
Chart.register(...registerables);

export default function CardBarChart() {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await statisticApi.getRevenueByDate(); // gọi đúng API lấy revenue
        const data = response.data.data || [];

        const labels = data.map((item) => {
          const [year, month] = item.date.split("-");
          return `${month}/${year}`; // hoặc `${year}-${month}` nếu thích định dạng khác
        });

        const values = data.map((item) => item.totalRevenue);

        const ctx = document.getElementById("bar-chart").getContext("2d");

        if (chartInstance) {
          chartInstance.destroy();
        }

        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Doanh thu (VNĐ)",
                data: values,
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                barThickness: 12,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#4B5563", // text-gray-600
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return (
                      "Doanh thu: " +
                      context.formattedValue.toLocaleString("vi-VN") +
                      " đ"
                    );
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#4B5563",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  color: "#4B5563",
                  stepSize: 100000,
                  callback: (value) =>
                    value.toLocaleString("vi-VN", {
                      maximumFractionDigits: 0,
                    }) + " đ",
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
              },
            },
          },
        });

        setChartInstance(newChart);
      } catch (err) {
        console.error("Failed to fetch revenue data", err);
      }
    };

    fetchRevenue();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-gray-400 mb-1 text-xs font-semibold">
              Doanh thu
            </h6>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-72">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
    </div>
  );
}
