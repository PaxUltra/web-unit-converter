function showForm(formType) {
    // Hide all forms
    const forms = document.querySelectorAll('.unit-form');
    forms.forEach(form => form.classList.add('hidden'));

    // Re-enable the selected form
    document.getElementById(`${formType}-form`).classList.remove('hidden');
}

async function convert(type, event) {
    // You will never 
    event.preventDefault();

    let value, unitTo, unitFrom;

    if (type == 'length') {
        value = document.getElementById('length-value').value;
        unitFrom = document.getElementById('length-from').value;
        unitTo = document.getElementById('length-to').value;
    } else if (type == 'mass') {
        value = document.getElementById('mass-value').value;
        unitFrom = document.getElementById('mass-from').value;
        unitTo = document.getElementById('mass-to').value;
    } else if (type == 'temp') {
        value = document.getElementById('temp-value').value;
        unitFrom = document.getElementById('temp-from').value;
        unitTo = document.getElementById('temp-to').value;
    }

    const response = await fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, unitFrom, unitTo, type })
    })

    const data = await response.json();
}