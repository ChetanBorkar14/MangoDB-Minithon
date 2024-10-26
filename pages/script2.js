// Pie Chart for Expenditure Distribution
const ctxPie = document.getElementById("pieChart").getContext("2d");
const expenditureData = {
  labels: ["Rent", "Groceries", "Utilities", "Transportation", "Entertainment"],
  datasets: [
    {
      label: "Expenditure",
      data: [1200, 300, 150, 200, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
      ],
      borderColor: "rgba(255, 255, 255, 1)",
      borderWidth: 2,
      hoverOffset: 6,
    },
  ],
};
new Chart(ctxPie, {
  type: "pie",
  data: expenditureData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyColor: "#fff",
        bodyFont: {
          size: 12,
        },
      },
    },
  },
});

// Bar Chart for Expenditure Overview
const ctxBar = document.getElementById("barChart").getContext("2d");
const expenditureOverviewData = {
  labels: ["Rent", "Groceries", "Utilities", "Transportation", "Entertainment"],
  datasets: [
    {
      label: "Expenditure Overview",
      data: [1200, 300, 150, 200, 100],
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
    },
  ],
};
new Chart(ctxBar, {
  type: "bar",
  data: expenditureOverviewData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyColor: "#fff",
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
    },
  },
});

// Line Chart for Monthly Returns
const ctxReturns = document.getElementById("returnsChart").getContext("2d");
const monthlyReturnsData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Monthly Returns",
      data: [300, 500, 400, 600, 700, 800, 900, 600, 500, 700, 800, 1000],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.3)",
      borderWidth: 2,
      fill: true,
      tension: 0.3,
    },
  ],
};
new Chart(ctxReturns, {
  type: "line",
  data: monthlyReturnsData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyColor: "#fff",
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
      },
    },
  },
});
