let payrollChart, empChart;

// 🔹 Function to Generate Payroll Pie Chart (Net Salary, PF, Tax)
function generatePayrollChart(salary, pf, tax) {
    let ctx = document.getElementById('payrollChart').getContext('2d');

    // Destroy previous chart to avoid duplication
    if (payrollChart) {
        payrollChart.destroy();
    }

    payrollChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                `Net Salary (₹${salary})`, 
                `Provident Fund (₹${pf})`, 
                `Tax (₹${tax})`
            ],
            datasets: [{
                data: [salary, pf, tax],
                backgroundColor: ['#007BFF', '#28a745', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,  // Ensures the chart doesn't stretch
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// 🔹 Employee Count Chart (Employees per Department)
function updateEmployeeChart(employees) {
    let ctx = document.getElementById('employeeChart').getContext('2d');
    let deptCounts = {};

    employees.forEach(emp => {
        deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
    });

    // Destroy previous chart to prevent multiple instances
    if (empChart) {
        empChart.destroy();
    }

    empChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(deptCounts),
            datasets: [{
                label: 'Employees per Department',
                data: Object.values(deptCounts),
                backgroundColor: ['#007BFF', '#28a745', '#dc3545', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
