// DOM interactions (error display, listeners, etc.)

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('fullName');
  const nameError = document.getElementById('nameError');
  const form = document.getElementById('registrationForm');

  if (!nameInput || !nameError || !form) return; // safety guard

const { showError, clearError} = require ('./helperFunctions.js');
  // Validation Function
  function validateName() {
    const fullName = nameInput.value.trim();

    if (fullName === '') {
      showError(nameInput, nameError, 'Full name is required.');
      return false;
    }

    const nameParts = fullName.split(/\s+/);
    if (nameParts.length < 2) {
      showError(nameInput, nameError, 'Please enter your first and last name.');
      return false;
    }

    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    if (!namePattern.test(fullName)) {
      showError(nameInput, nameError, 'Name can only contain letters, accents, spaces, hyphens.');
      return false;
    }

    clearError(nameInput, nameError);
    return true;
  }

  // Event Listeners
  // Instant validation while typing
  nameInput.addEventListener('input', validateName);

  // Validate again when leaving the field (ensures proper cleanup before submitting)
  nameInput.addEventListener('blur', validateName);

  // Prevent form submission if invalid
  form.addEventListener('submit', function (event) {
    if (!validateName()) {
      event.preventDefault();
    }
  });
});