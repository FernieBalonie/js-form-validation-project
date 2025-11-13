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

  module.exports = {
    showError,
    clearError,
  };