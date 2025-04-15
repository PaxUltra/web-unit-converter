function hideForms() {
    // Hide all forms
    const forms = document.querySelectorAll('.unit-form');
    forms.forEach(form => form.classList.add('hidden'));
}

function editAndShowResult(message) {
    document.getElementById('result-text').innerText = message;
    document.getElementById('result-div').classList.remove('hidden');
}

function showForm(formType) {
    hideForms();

    // Re-enable the selected form
    document.getElementById(`${formType}-form`).classList.remove('hidden');
}

async function convert(type, event) {
    // You will never escape it
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

    if (response.ok) {
        // Hide all forms
        hideForms();

        // Prepare the result div
        // Then display it
        editAndShowResult(`Result: ${data.result}`)
    } else {
        // Show the error
        editAndShowResult(`Error: ${data.error}`)
    }
}

function reset() {
    activeForm = document.getElementsByClassName('active-form')

    // Clear all form values
    values = document.querySelectorAll('input[type="text"]');
    values.forEach(input => input.value = "");

    // Hide the result div
    document.getElementById('result-div').classList.add('hidden');

    // Show the active form
}