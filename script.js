document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('fullName');
  const nameError = document.getElementById('nameError');
  const form = document.getElementById('registrationForm');

  if (!nameInput || !nameError || !form) return; // safety guard

  // --- Helper Functions ---
  function showError(input, errorElement, message) {
    input.classList.add('error-border');
    input.classList.remove('success-border');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  function clearError(input, errorElement) {
    input.classList.remove('error-border');
    input.classList.add('success-border');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  // --- Validation Function ---
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
      showError(nameInput, nameError, 'Name can only contain letters, spaces, or hyphens.');
      return false;
    }

    clearError(nameInput, nameError);
    return true;
  }

  // --- Event Listeners ---
  // Instant validation while typing
  nameInput.addEventListener('input', validateName);

  // Validate again when leaving the field (ensures proper cleanup)
  nameInput.addEventListener('blur', validateName);

  // Validate before form submission
  form.addEventListener('submit', function (event) {
    if (!validateName()) {
      event.preventDefault();
    }
  });
});