function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

document.getElementById('payrollForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('employeeName').value;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);

    // Constants
    const standardHours = 40;
    const overtimeMultiplier = 1.5;

    // Calculate pay
    let regularPay = 0;
    let overtimePay = 0;

    if (hoursWorked > standardHours) {
        regularPay = standardHours * hourlyRate;
        overtimePay = (hoursWorked - standardHours) * hourlyRate * overtimeMultiplier;
    } else {
        regularPay = hoursWorked * hourlyRate;
    }

    const totalPay = regularPay + overtimePay;

    // Display results
    document.getElementById('displayName').innerText = name;
    document.getElementById('grossPay').innerText = regularPay.toFixed(2);
    document.getElementById('overtimePay').innerText = overtimePay.toFixed(2);
    document.getElementById('totalPay').innerText = totalPay.toFixed(2);
    document.getElementById('payrollResult').style.display = 'block';
