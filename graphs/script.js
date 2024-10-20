const ctxPie = document.getElementById('pieChart').getContext('2d');
const ctxBar = document.getElementById('barChart').getContext('2d');
const ctxReturns = document.getElementById('returnsChart').getContext('2d');

// Sample data for expenditure
const expenditureData = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment'],
    datasets: [{
        label: 'Expenditure',
        data: [1200, 300, 150, 200, 100],
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
        ],
        borderWidth: 1,
        borderColor: '#fff',
        hoverOffset: 4
    }]
};

// Sample data for monthly returns
const monthlyReturnsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Monthly Returns',
        data: [300, 500, 400, 600, 700, 800, 900, 600, 500, 700, 800, 1000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
    }]
};

// Sample data for expenditure overview (Bar Chart)
const expenditureOverviewData = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment'],
    datasets: [{
        label: 'Expenditure Overview',
        data: [1200, 300, 150, 200, 100],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderWidth: 1,
        borderColor: '#fff'
    }]
};

// Creating the Pie Chart
const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: expenditureData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenditure Distribution'
            }
        }
    }
});

// Creating the Bar Chart
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: expenditureOverviewData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenditure Overview'
            }
        }
    }
});

// Creating the Line Chart for Monthly Returns
const returnsChart = new Chart(ctxReturns, {
    type: 'line',
    data: monthlyReturnsData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Returns'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
