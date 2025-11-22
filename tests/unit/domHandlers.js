/**
 * DOM Handlers - Connects validation logic to UI.
 */

// import helper functions and validation logic
let helpers, validationLogic;

if (typeof require !== 'undefined') {
    helpers = require('./helperFunctions.js');
    validationLogic = require('./validationLogic.js');
}

document.addEventListener('DOMContentLoaded', () => {
//cache DOM elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneCountryCodeSelect = document.getElementById('phoneCountryCode');
const phoneNumberInput = document.getElementById('phoneNumber');
const dobInput = document.getElementById('dob');
const calculatedAgeSpan = document.getElementById('calculatedAge');
const ageConfirmGroup = document.getElementById('ageConfirmGroup');
const ageConfirmCheckbox = document.getElementById('ageConfirm'); 
const genderRadios = document.querySelectorAll('input[name="gender"]');
const countrySelect = document.getElementById('country');
const postalCodeInput = document.getElementById('postalCode');
const termsCheckbox = document.getElementById('terms');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const dobError = document.getElementById('dobError');
const ageConfirmError = document.getElementById('ageConfirmError');
const genderError = document.getElementById('genderError'); 
const countryError = document.getElementById('countryError');
const postalCodeError = document.getElementById('postalCodeError');
const termsError = document.getElementById('termsError');

// get postal code form group 
const postalCodeGroup = postalCodeInput ? postalCodeInput.closest('.form-group') : null;

//safety guard
if (!form || !nameInput || !emailInput || !dobInput || !countrySelect || !postalCodeInput || !termsCheckbox) {
    return;
}

//call the populateCountryDropdowns function
populateCountryDropdowns();

// hide postal code field initially 
    if (postalCodeGroup) {
        postalCodeGroup.style.display = 'none';
    }

// helper function references
const showError = helpers ? helpers.showError : window.showError;
const clearError = helpers ? helpers.clearError : window.clearError;

// FULL NAME VALIDATION LOGIC

function validateName() {
const fullName = nameInput.value.trim();

if (fullName === '') {
    showError(nameInput, nameError, "Full name is required.");
    return false;
}

const nameParts = fullName.split(/\s+/);
  if (nameParts.length < 2) {
    showError(nameInput, nameError, "Please enter your first and last name.");
    return false;
}

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
if (!namePattern.test(fullName)) {
    showError(nameInput, nameError, "Name can only contain letters, accents, spaces, hyphens.");
    return false;
}

clearError(nameInput, nameError);
return true;
}

// EMAIL VALIDATION

function validateEmail() {
    const email = emailInput.value.trim();

    if (email === '') {
        showError(emailInput, emailError, "Email address is required.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError(emailInput, emailError, "Please enter a valid email address.");
        return false;
    }

    clearError(emailInput, emailError);
    return true;
}

//validate phone number
function validatePhoneNumber() {
    const phoneNumber = phoneNumberInput ? phoneNumberInput.value.trim() : '';
    const countryCode = phoneCountryCodeSelect ? phoneCountryCodeSelect.value : '';
    
    //check if elements exist
    if (!phoneNumberInput || !phoneCountryCodeSelect) {
        return true; // obv skip validation if elements don't exist
    }
    
    //check if country code is selected
    if (!countryCode || countryCode === '') {
        showError(phoneCountryCodeSelect, phoneError, "Please select a country code.");
        return false;
    }
    
    //check if phone number is provided by user
    if (phoneNumber === '') {
        showError(phoneNumberInput, phoneError, "Phone number is required.");
        return false;
    }
    
    //validate using validation logic
    const isValid = validationLogic ? 
        validationLogic.validatePhone(phoneNumber, countryCode) : 
        window.validatePhone && window.validatePhone.validatePhone ? 
        window.validatePhone.validatePhone(phoneNumber, countryCode) : true;
    
    if (!isValid) {
        showError(phoneNumberInput, phoneError, "Please enter a valid phone number (7-15 digits).");
        return false;
    }
    
    clearError(phoneNumberInput, phoneError);
    clearError(phoneCountryCodeSelect, phoneError);
    return true;
}

// DATE OF BIRTH VALIDATION LOGIC

function validateDOB() {
  const dateString = dobInput.value;

  if (!dateString || dateString.trim() === '') {
    showError(dobInput, dobError, "Date of birth is required.");
    hideAgeConfirmation();  
    return false;
    }

  const inputDate = new Date(dateString);
  const today = new Date();

    // Calculate age
  let age = today.getFullYear() - inputDate.getFullYear();
  const monthDiff = today.getMonth() - inputDate.getMonth();
  const dayDiff = today.getDate() - inputDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
    }

  if (inputDate > today) {
    showError(dobInput, dobError, "Date of birth cannot be in the future.");
    hideAgeConfirmation();  
    return false;
    }

  if (age < 16) {
    showError(dobInput, dobError, "You must be at least 16 years old.");
    hideAgeConfirmation();  
    return false;
    }

  if (age > 100) {
    showError(dobInput, dobError, "Please enter a valid date of birth.");
    hideAgeConfirmation();  
    return false;
    }

  clearError(dobInput, dobError);
  showAgeConfirmation(age); 
  return true;
}




// age confirmation

function showAgeConfirmation(age) {
  if (!ageConfirmGroup) return;
  
  // Update the age in the span
  if (calculatedAgeSpan) {
    calculatedAgeSpan.textContent = age;
  }
  
  // Update the label text to handle singular/plural "year/years"
  const ageConfirmLabelSpan = document.getElementById('ageConfirmLabel');
  if (ageConfirmLabelSpan) {
    ageConfirmLabelSpan.textContent = `Can you confirm you are ${age} year${age === 1 ? "" : "s"} old?`;
  }
  
  // Show the confirmation box
  ageConfirmGroup.style.display = 'block';
  
  return true;
}

function hideAgeConfirmation() {
  if (!ageConfirmGroup) return;
  
  // Hide the confirmation box
  ageConfirmGroup.style.display = 'none';
  
  // Uncheck and clear any errors
  if (ageConfirmCheckbox) {
    ageConfirmCheckbox.checked = false;
    clearError(ageConfirmCheckbox, ageConfirmError);
}
}

function validateAgeConfirmation() {
  const isChecked = ageConfirmCheckbox.checked;

  if (!isChecked) {
    showError(ageConfirmCheckbox, ageConfirmError, "Please confirm your age to continue.");
    return false;
  }

  clearError(ageConfirmCheckbox, ageConfirmError);
  return true;
}

//gender validation
function validateGenderSelection() {
    //find which radio button is checked
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    
    //if no radio button is selected
    if (!selectedGender) {
        showError(genderRadios[0], genderError, "Please select your gender.");
        return false;
    }
    
    //validate the selected value using validation logic
    const isValid = validationLogic ? 
        validationLogic.validateGender(selectedGender.value) : 
        window.validateGender && window.validateGender.validateGender ? 
        window.validateGender.validateGender(selectedGender.value) : true;
    
    if (!isValid) {
        showError(genderRadios[0], genderError, "Please select a valid gender option.");
        return false;
    }
    
    clearError(genderRadios[0], genderError);
    return true;
}

//dropdown country population validation
function populateCountryDropdowns() {
    //check if countriesData is available first
    if (typeof countriesData === 'undefined') {
        console.error('countriesData not found. Make sure countriesData.js is loaded.');
        return;
    }

    //populate main country select with options
    countriesData.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });

    //populate phone country code select for phone number
    if (phoneCountryCodeSelect) {
        countriesData.forEach(country => {
            const option = document.createElement('option');
            option.value = country.dialCode;
            option.textContent = `${country.name} (${country.dialCode})`;
            phoneCountryCodeSelect.appendChild(option);
        });
    }
}

// COUNTRY VALIDATION LOGIC

function validateCountry() {
  const countryCode = countrySelect.value;

    if (!countryCode || countryCode === '') {
      showError(countrySelect, countryError, "Please select a country.");
      togglePostalCodeField(countryCode);
      return false;
    }

    clearError(countrySelect, countryError);
    
    // show/hide postal code field based on country
    togglePostalCodeField(countryCode);
    
    // trigger postal code validation if UK is selected and field has value
    if (countryCode === 'GB' && postalCodeInput.value) {
        validatePostalCode();
    }
    
    return true;
}


// POSTAL CODE VALIDATION 
function togglePostalCodeField(countryCode) {
  if (!postalCodeGroup) return;

  if (countryCode === 'GB') {
    // show postal code field for UK
    postalCodeGroup.style.display = 'block';
  } else {
    // hide postal code field for non-UK countries
    postalCodeGroup.style.display = 'none';
    // clear errors when hiding
    clearError(postalCodeInput, postalCodeError);
  }
}
// POSTAL CODE VALIDATION (UK ONLY)

function validatePostalCode() {
  const postalCode = postalCodeInput.value.trim();
  const countryCode = countrySelect.value;

    // Only validate if UK is selected
    if (countryCode !== 'GB') {
      clearError(postalCodeInput, postalCodeError);
      return true; // not required for non-UK
  }

    // UK validation
    if (postalCode === '') {
      showError(postalCodeInput, postalCodeError, "UK postal code is required.");
      return false;
    }

    // UK postal code format validation
  const ukPostalPattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
    if (!ukPostalPattern.test(postalCode)) {
      showError(postalCodeInput, postalCodeError, "UK postal code format is invalid (e.g., SW1A 1AA).");
      return false;
    }

    clearError(postalCodeInput, postalCodeError);
    return true;
}

// TERMS & CONDITIONS VALIDATION 
function validateTerms() {
  const isChecked = termsCheckbox.checked;

  if (!isChecked) {
    showError(termsCheckbox, termsError, "You must agree to the terms and conditions.");
    return false;
  }

  clearError(termsCheckbox, termsError);
  return true;
}


// FORM SUBMISSION VALIDATION 
function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhoneNumber();
  const isDOBValid = validateDOB();
  const isGenderValid = validateGenderSelection();
  const isCountryValid = validateCountry();
  const areTermsValid = validateTerms();

  const isAgeConfirmValid = ageConfirmGroup && ageConfirmGroup.style.display === 'block' 
    ? validateAgeConfirmation() 
    : true;
  
  // Only validate postal code if UK is selected
  const countryCode = countrySelect.value;
  const isPostalCodeValid = countryCode === 'GB' ? validatePostalCode() : true;

  return isNameValid && isEmailValid && isPhoneValid && isDOBValid && isAgeConfirmValid && isGenderValid && isCountryValid && isPostalCodeValid && areTermsValid;
}

// event listeners
// Full name
nameInput.addEventListener('input', validateName);
nameInput.addEventListener('blur', validateName);

// Email
emailInput.addEventListener('input', validateEmail);
emailInput.addEventListener('blur', validateEmail);

//phone number
if (phoneCountryCodeSelect) {
    phoneCountryCodeSelect.addEventListener('change', validatePhoneNumber);
    phoneCountryCodeSelect.addEventListener('blur', validatePhoneNumber);
}

if (phoneNumberInput) {
    phoneNumberInput.addEventListener('input', validatePhoneNumber);
    phoneNumberInput.addEventListener('blur', validatePhoneNumber);
}

// Date of Birth
dobInput.addEventListener('input', validateDOB);
dobInput.addEventListener('blur', validateDOB);

//age confirmation
if (ageConfirmCheckbox) {
  ageConfirmCheckbox.addEventListener('change', validateAgeConfirmation);
  ageConfirmCheckbox.addEventListener('blur', validateAgeConfirmation);
}

//gender
if (genderRadios && genderRadios.length > 0) {
    genderRadios.forEach(radio => {
        radio.addEventListener('change', validateGenderSelection);
    });
}

// Country
countrySelect.addEventListener('change', validateCountry);
countrySelect.addEventListener('blur', validateCountry);

// Postal Code
postalCodeInput.addEventListener('input', validatePostalCode);
postalCodeInput.addEventListener('blur', validatePostalCode);

// Terms
termsCheckbox.addEventListener('change', validateTerms);

// Form before submit
form.addEventListener('submit', function(event) {
  if (!validateForm()) {
    event.preventDefault();
}
});


// global exports (for browser and testing)

window.validateName = validateName;
window.validateEmail = validateEmail;
window.validatePhoneNumber = validatePhoneNumber;
window.validateDOB = validateDOB;
window.validateGender = validateGenderSelection;
window.validateCountry = validateCountry;
window.validatePostalCode = validatePostalCode;
window.validateTerms = validateTerms;
window.validateForm = validateForm;

// module exports (for Node.js testing)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateName,
    validateEmail,
    validatePhoneNumber,
    validateDOB,
    validateGenderSelection,
    validateCountry,
    validatePostalCode,
    validateTerms,
    validateForm
  };
}
});

