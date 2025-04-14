function showForm(formType) {
    // Hide all forms
    const forms = document.querySelectorAll('.unit-form');
    forms.forEach(form => form.classList.add('hidden'));

    // Re-enable the selected form
    document.getElementById(`${formType}-form`).classList.remove('hidden');
}