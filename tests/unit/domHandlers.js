// DOM interactions (error display, listeners, etc.)

let helpers;
if (typeof require !== 'undefined'){
   helpers = require('../unit/helperFunctions.js');
}

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('fullName');
  const nameError = document.getElementById('nameError');
  const form = document.getElementById('registrationForm');

  if (!nameInput || !nameError || !form) return; // safety guard


  // Validation functions
  function validateName() {
    const fullName = nameInput.value.trim();

    if (fullName === '') {
      (helpers ? helpers.showError : window.showError)(nameInput, nameError, "Full name is required.");
      return false;
    }

    const nameParts = fullName.split(/\s+/);
    if (nameParts.length < 2) {
      (helpers ? helpers.showError : window.showError)(nameInput, nameError, "Please enter your first and last name.");
      return false;
    }

    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    if (!namePattern.test(fullName)) {
      (helpers ? helpers.showError : window.showError)(nameInput, nameError, "Name can only contain letters, accents, spaces, hyphens.");
      return false;
    }

    (helpers ? helpers.clearError : window.clearError)(nameInput, nameError);
    return true;
  }

  //Broswer global
 window.validateName = validateName;


  // Event Listeners
  nameInput.addEventListener('input', validateName); // Instant validation while typing
  nameInput.addEventListener('blur', validateName);  // Validate again when leaving the field (ensures proper cleanup before submitting)
  form.addEventListener('submit', function (event) {
    if (!validateName()) {
      event.preventDefault();
    }
  });
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      validateName
    }
  }
});