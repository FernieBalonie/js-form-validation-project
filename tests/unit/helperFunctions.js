function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error-border');
    input.classList.remove('success-border');
   
  }

  function clearError(input, errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error-border');
    input.classList.add('success-border');
   
  }

if (typeof window !== 'undefined') {
    window.showError = showError;
    window.clearError = clearError;
}

//globally accesible
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showError,
        clearError
    }
}



