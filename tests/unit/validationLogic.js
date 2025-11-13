// Validation logic for testing

//Full name validation (returns true or false)
function validateName (fullName) {
  const trimmed = fullName.trim();

  //Empty check
  if (trimmed === '') {
    return false;
  }

  //Name check
  const nameParts = trimmed.split(/\s+/);
  if (nameParts.length < 2) {
    return false;
  }

  //Letters, accents, spaces, hyphens apostrophes check
  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  if (!namePattern.test(trimmed)){
    return false;
    
  }

  return true;
}  

//EXPORT for tests
module.exports = {
    validateName,
  };

 
//Make available globally in browser
if (typeof window !== 'undefined') {
  window.validateName = validateName;
}

