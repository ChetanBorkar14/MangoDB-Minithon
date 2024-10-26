"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  };

  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelector("[data-nav-toggler]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  const toggleNavbar = function () {
    navbar.classList.toggle("active");
  };

  addEventOnElem(navToggler, "click", toggleNavbar);

  const closeNavbar = function () {
    navbar.classList.remove("active");
  };

  addEventOnElem(navLinks, "click", closeNavbar);

  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  });

  const ctxPie = document.getElementById("pieChart").getContext("2d");
  const ctxBar = document.getElementById("barChart").getContext("2d");
  const ctxReturns = document.getElementById("returnsChart").getContext("2d");

  const expenditureData = {
    labels: [
      "Rent",
      "Groceries",
      "Utilities",
      "Transportation",
      "Entertainment",
    ],
    datasets: [
      {
        label: "Expenditure",
        data: [1200, 300, 150, 200, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
        borderColor: "#fff",
        hoverOffset: 4,
      },
    ],
  };

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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const expenditureOverviewData = {
    labels: [
      "Rent",
      "Groceries",
      "Utilities",
      "Transportation",
      "Entertainment",
    ],
    datasets: [
      {
        label: "Expenditure Overview",
        data: [1200, 300, 150, 200, 100],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  new Chart(ctxPie, {
    type: "pie",
    data: expenditureData,
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Expenditure Distribution" },
      },
    },
  });

  new Chart(ctxBar, {
    type: "bar",
    data: expenditureOverviewData,
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Expenditure Overview" },
      },
    },
  });

  new Chart(ctxReturns, {
    type: "line",
    data: monthlyReturnsData,
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Monthly Returns" },
      },
      scales: { y: { beginAtZero: true } },
    },
  });
});
