import React, { useEffect } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { statisticApi } from "../../../../api/statistic";

Chart.register(PieController, ArcElement, Tooltip, Legend);

export default function CardPieChart() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả lập API trả về (bạn nên thay thế bằng API thật)
        const response = await statisticApi.getPostByStatus();

        const data = response.data.data;

        const labels = data.map((item) => item.label);
        const values = data.map((item) => item.count);
        const backgroundColors = [
          "#fbbf24", // PENDING - vàng
          "#34d399", // APPROVED - xanh
          "#a78bfa", // EXPIRED - tím
          "#f87171", // REJECTED - đỏ
          "#60a5fa", // PAYING - xanh dương
        ];

        const ctx = document.getElementById("pie-chart").getContext("2d");

        new Chart(ctx, {
          type: "pie",
          data: {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: backgroundColors,
                borderColor: "#fff",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#000",
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.raw || 0;
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch pie chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col bg-white rounded shadow p-4 w-full items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Trạng thái bài đăng
      </h2>
      <div className="relative h-80 flex justify-center items-center w-full">
        <canvas id="pie-chart"></canvas>
      </div>
    </div>
  );
}
