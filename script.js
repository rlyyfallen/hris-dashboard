let payrollChart, empChart;
let employees = [];

function switchTab(tabName) {
    document.getElementById('employees').style.display = 'none';
    document.getElementById('payroll').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById(tabName).style.display = 'block';
}

function addEmployee() {
    let name = document.getElementById('empName').value;
    let salary = document.getElementById('salary').value;
    let department = document.getElementById('department').value;

    if (!name || !salary || !department) {
        alert('Please fill in all fields!');
        return;
    }

    employees.push({ name, salary, department });
    updateEmployeeChart();
}

function updateEmployeeChart() {
    let ctx = document.getElementById('employeeChart').getContext('2d');
    let deptCounts = {};

    employees.forEach(emp => {
        deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
    });

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
        }
    });
}

function calculatePayroll() {
    let salary = document.getElementById('baseSalary').value;
    if (!salary) {
        alert('Please enter a salary amount!');
        return;
    }

    let pf = salary * 0.12;
    let tax = salary > 50000 ? salary * 0.2 : salary * 0.1;
    let netSalary = salary - (pf + tax);

    document.getElementById('payrollResult').innerHTML = `Net Salary: ₹${netSalary}`;

    generatePayrollChart(netSalary, pf, tax);
}

function generatePayrollChart(salary, pf, tax) {
    let ctx = document.getElementById('payrollChart').getContext('2d');

    if (payrollChart) {
        payrollChart.destroy();
    }

    payrollChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [`Net Salary (₹${salary})`, `PF (₹${pf})`, `Tax (₹${tax})`],
            datasets: [{
                data: [salary, pf, tax],
                backgroundColor: ['#007BFF', '#28a745', '#ffc107']
            }]
        }
    });
}

function addEvent() {
    let eventList = document.getElementById('eventList');
    let date = document.getElementById('eventDate').value;
    let name = document.getElementById('eventName').value;
    let desc = document.getElementById('eventDesc').value;

    if (!date || !name || !desc) {
        alert('Please fill in all fields!');
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> (${date}): ${desc}`;
    eventList.appendChild(li);
}
