document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tax-form');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    const closeButtonModal = document.querySelector('.close-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Reset error indicators
        const errorIcons = document.querySelectorAll('.tooltip.error');
        errorIcons.forEach(icon => icon.style.display = 'none');

        // Get form values
        const grossIncome = parseFloat(document.getElementById('gross-income').value);
        const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
        const ageGroup = document.getElementById('age-group').value;
        const totalDeductions = parseFloat(document.getElementById('total-deductions').value) || 0;

        // Validate gross income
        if (isNaN(grossIncome)) {
            document.querySelector('#gross-income + .tooltip.error').style.display = 'inline-block';
            return;
        }

        // Validate age group
        if (!ageGroup) {
            document.querySelector('#age-group + .tooltip.error').style.display = 'inline-block';
            return;
        }

        // Perform tax calculation
        let taxRate;
        if (ageGroup === '<40') {
            taxRate = 0.3;
        } else if (ageGroup === '>=40&<60') {
            taxRate = 0.4;
        } else if (ageGroup === '>=60') {
            taxRate = 0.1;
        }

        let taxableIncome = grossIncome + extraIncome - totalDeductions - 800000;
        if (taxableIncome <= 0) {
            taxableIncome = 0;
        }

        const taxAmount = taxableIncome * taxRate;

        // Show tax result modal
        const taxResult = document.getElementById('tax-result');
        taxResult.textContent = `Your overall income will be ₹${(grossIncome + extraIncome - taxAmount).toFixed(2)} after tax deductions`;
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    closeButtonModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
