// Validation logic for testing 

//Full name validation (returns true or false)
function validateName (fullName) {
  const trimmedName = fullName.trim();

  //Empty check
  if (trimmedName === '') {
    return false;
  }

  //Name check
  const nameParts = trimmedName.split(/\s+/);
  if (nameParts.length < 2) {
    return false;
  }

  //Letters, accents, spaces, hyphens apostrophes check
  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  if (!namePattern.test(trimmedName)){
    return false;
    
  }

  return true;
} 

//Email validation
function validateEmail(email) {
  const trimmedEmail = email.trim();

  //Empty check
  if (trimmedEmail === '') {
    return false;
  }

  //check for consecutive dots
    if (trimmedEmail.includes('..')) {
        return false;
    }

  //Email pattern check - testemail@domain.tdl
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(trimmedEmail);

}

//Date of birth and age validation
function validateDOB(dateString) {
  //empty check
  if (!dateString || dateString.trim() === '') {
    return false;
  } 

  const inputDate = new Date(dateString);
  const today = new Date();

  //calculate age
  let age = today.getFullYear() - inputDate.getFullYear();
  const monthDiff = today.getMonth() - inputDate.getMonth();
  const dayDiff = today.getDate() - inputDate.getDate();

  //adjust age if birthday hasn't occurred yet
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  //check if date is in the future
  if (inputDate > today) {
    return false;
  }

  //check if user is under 16 years old
  if (age < 16) {
    return false;
  }

  //check if user is over 100 years old
  if (age > 100) {
    return false;
  }

  return true;

}

//Age confirmation validation
function validateAgeConfirmation(isChecked) {
  return isChecked === true;
}

//Country validation
function validateCountry(countryCode) {
    // Check if empty or default placeholder
    if (!countryCode || countryCode.trim() === '' || countryCode === 'Select a country') {
        return false;
    }
    
    return true;
}

// Post code validation
function validatePostalCode(postalCode, countryCode) {
    // Only required for UK (GB)
    if (countryCode !== 'GB') {
        return true; // Not required for non-UK countries
    }
    
    const trimmedCode = postalCode.trim();
    
    // Check if empty (only for UK)
    if (trimmedCode === '') {
        return false;
    }
    
    // UK postal code validation
    return /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i.test(trimmedCode);
}

// terms & conditions validation
function validateTerms(isChecked) {
  return isChecked === true;
}

//phone number valdation
function validatePhone (phoneNumber, countryCode){

  if (!countryCode || countryCode.trim() === ''){
    return false;
  }
  // first check if number is null, empty or invalid
  if (!phoneNumber) {
    return false;
  }

  const trimmedPhone = phoneNumber.trim();
  if (trimmedPhone === '') {
    return false;
  }

  const cleanedPhone = trimmedPhone.replace(/[\s\-\(\)]/g, '');

  // Check if phone contains only digits (after cleaning)
  const phonePattern = /^\d+$/;
  if (!phonePattern.test(cleanedPhone)) {
    return false;
  }

  // Check length (typically 7-15 digits for international numbers)
  if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
    return false;
  }

  return true;
}

//gender validation
function validateGender(genderValue) {
  // Check if a gender option is selected
  if (!genderValue || genderValue.trim() === '') {
    return false;
  }

  // Check if the value is one of the valid options
  const validOptions = ['female', 'male', 'other'];
  return validOptions.includes(genderValue.toLowerCase());
}

//browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateName,
    validateEmail,
    validateDOB,
    validateAgeConfirmation,
    validateCountry,
    validatePostalCode,
    validatePhone,
    validateGender,
    validateTerms
  };  
}
 
//available globally in browser
if (typeof window !== 'undefined') {
  window.validateName = {
    validateName,
    validateEmail,
    validateDOB,
    validateAgeConfirmation,
    validateCountry,
    validatePostalCode,
    validatePhone,
    validateGender,
    validateTerms
  };
}


