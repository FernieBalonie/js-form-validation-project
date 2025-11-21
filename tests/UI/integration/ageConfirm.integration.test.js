// Age confirmation display and interaction validation tests

const fs = require('fs');
const path = require('path');

describe('Age Confirmation - Conditional Display & Validation', () => {
    let html;
    let dobInput;
    let ageConfirmGroup;
    let ageConfirmCheckbox;
    let ageConfirmError;
    let ageConfirmLabel;

    beforeEach(() => {
        html = fs.readFileSync(path.resolve(__dirname, '../../../index.html'), 'utf-8');
    
        const htmlWithoutScripts = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // set the html without scripts
        document.documentElement.innerHTML = htmlWithoutScripts;

        jest.resetModules();
        require('../../unit/domHandlers.js');
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

        dobInput = document.getElementById('dob');
        ageConfirmGroup = document.getElementById('ageConfirmGroup');
        ageConfirmCheckbox = document.getElementById('ageConfirm');
        ageConfirmError = document.getElementById('ageConfirmError');
        ageConfirmLabel = document.getElementById('ageConfirmLabel');

        if (!dobInput || !ageConfirmGroup || !ageConfirmCheckbox) {
            console.error('Missing elements:');
            console.error('dobInput:', dobInput);
            console.error('ageConfirmGroup:', ageConfirmGroup);
            console.error('ageConfirmCheckbox:', ageConfirmCheckbox);
            throw new Error('Critical DOM elements not found. Check HTML structure.');
        }
    });

    //checkbox visibility
    describe('Confirmation checkbox visibility', () => {
        test('age confirmation box is hidden by default', () => {
            expect(ageConfirmGroup.style.display).toBe('none');
        });

        test('age confirmation box appears when valid DOB is entered', () => {
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            const validDateStr = validDate.toISOString().split('T')[0];

            dobInput.value = validDateStr;
            dobInput.dispatchEvent(new Event('input'));

            expect(ageConfirmGroup.style.display).toBe('block');
        });

        test('age confirmation box does not appear when DOB is empty', () => {
            dobInput.value = '';
            dobInput.dispatchEvent(new Event('input'));

            expect(ageConfirmGroup.style.display).toBe('none');
        });

        test('age confirmation box does not appear when DOB is invalid (under 16)', () => {
            const today = new Date();
            const under16 = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
            const under16Str = under16.toISOString().split('T')[0];

            dobInput.value = under16Str;
            dobInput.dispatchEvent(new Event('input'));

            expect(ageConfirmGroup.style.display).toBe('none');
        });

        test('age confirmation box does not appear when DOB is future date', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);
            const futureDateStr = futureDate.toISOString().split('T')[0];

            dobInput.value = futureDateStr;
            dobInput.dispatchEvent(new Event('input'));

            expect(ageConfirmGroup.style.display).toBe('none');
        });

        test('age confirmation box hides when valid DOB is changed to invalid', () => {
            // First enter valid DOB
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
            dobInput.value = validDate.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));
            expect(ageConfirmGroup.style.display).toBe('block');

            // Then change to invalid
            dobInput.value = '';
            dobInput.dispatchEvent(new Event('input'));
            expect(ageConfirmGroup.style.display).toBe('none');
        });
    });

    //dynamic age display for checkbox
    describe('Dynamic age display in checkbox', () => {
        test('label displays correct age for 25 year old', () => {
            const today = new Date();
            const age25 = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            
            dobInput.value = age25.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            expect(ageConfirmLabel.textContent).toContain('25');
        });

        test('label displays correct age for 16 year old', () => {
            const today = new Date();
            const age16 = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate() - 1);
            
            dobInput.value = age16.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            expect(ageConfirmLabel.textContent).toContain('16');
        });

        test('label updates when DOB changes', () => {
            const today = new Date();
            
            //first set to 25
            const age25 = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = age25.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));
            expect(ageConfirmLabel.textContent).toContain('25');

            //then change to 30
            const age30 = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
            dobInput.value = age30.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));
            expect(ageConfirmLabel.textContent).toContain('30');
        });
    });

    //checkbox validation
    describe('Age confirmation validation', () => {
        beforeEach(() => {
            // first enter valid DOB to show the checkbox
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = validDate.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));
        });

        test('shows error when checkbox is not checked and user moves to next field', () => {
            ageConfirmCheckbox.checked = false;
            ageConfirmCheckbox.dispatchEvent(new Event('blur'));

            expect(ageConfirmCheckbox.classList.contains('error-border')).toBe(true);
            expect(ageConfirmError.textContent).toBe('Please confirm your age to continue.');
            expect(ageConfirmError.style.display).toBe('block');
        });

        test('shows error when checkbox is unchecked after being checked', () => {
            //first check it
            ageConfirmCheckbox.checked = true;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));
            expect(ageConfirmCheckbox.classList.contains('success-border')).toBe(true);

            //then uncheck it
            ageConfirmCheckbox.checked = false;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));
            expect(ageConfirmCheckbox.classList.contains('error-border')).toBe(true);
            expect(ageConfirmError.textContent).toBe('Please confirm your age to continue.');
        });

        test('clears error and shows success when checkbox is checked', () => {
            ageConfirmCheckbox.checked = true;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));

            expect(ageConfirmCheckbox.classList.contains('success-border')).toBe(true);
            expect(ageConfirmCheckbox.classList.contains('error-border')).toBe(false);
            expect(ageConfirmError.textContent).toBe('');
            expect(ageConfirmError.style.display).toBe('none');
        });

        test('checkbox has red border when validation fails', () => {
            ageConfirmCheckbox.checked = false;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));

            expect(ageConfirmCheckbox.classList.contains('error-border')).toBe(true);
        });

        test('error message is visible when checkbox not checked', () => {
            ageConfirmCheckbox.checked = false;
            ageConfirmCheckbox.dispatchEvent(new Event('blur'));

            expect(ageConfirmError.style.display).toBe('block');
            expect(ageConfirmError.textContent.length).toBeGreaterThan(0);
        });
    });

    //form submission validation
    describe('Form submission requirements', () => {
        test('form submission fails when age confirmation not checked', () => {
            const form = document.getElementById('registrationForm');
            
            //valid DOB
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = validDate.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            //checkbox unchecked
            ageConfirmCheckbox.checked = false;

            //try to submit
            const submitEvent = new Event('submit', { cancelable: true });
            form.dispatchEvent(submitEvent);

            //shows error
            expect(ageConfirmCheckbox.classList.contains('error-border')).toBe(true);
        });

        test('form can be submitted when age confirmation is checked', () => {
            const form = document.getElementById('registrationForm');
            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const dobInput = document.getElementById('dob');
            const countrySelect = document.getElementById('country');
            const termsCheckbox = document.getElementById('terms');

            
            //valid inputs
            nameInput.value = 'Fernanda Mauri';
            emailInput.value = 'fe07mauri@example.com';
            countrySelect.value = 'US';
            termsCheckbox.checked = true;

            
            //valid DOB
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = validDate.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            ageConfirmCheckbox.checked = true;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));

            // Now try to submit
            const submitEvent = new Event('submit', { cancelable: true });
            form.dispatchEvent(submitEvent);
            expect(submitEvent.defaultPrevented).toBe(false);
    }); 
    });

    //user workflow validation
    describe('Complete user workflow', () => {
        test('user enters DOB -> box appears -> checks box -> validation passes', () => {
            //valid DOB
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = validDate.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));
            expect(ageConfirmGroup.style.display).toBe('block');

            //checked box
            ageConfirmCheckbox.checked = true;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));

            //validation passes
            expect(ageConfirmCheckbox.classList.contains('success-border')).toBe(true);
            expect(ageConfirmError.textContent).toBe('');
        });

        test('user enters invalid DOB -> box hidden -> checkbox state irrelevant', () => {
            const today = new Date();
            const under16 = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
            
            dobInput.value = under16.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            //box hides regardless of checkbox state because user is under 16
            expect(ageConfirmGroup.style.display).toBe('none');
        });

        test('checkbox state persists when changing DOB between valid ages', () => {
            const today = new Date();

            //age 25
            const age25 = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = age25.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            //checcked box
            ageConfirmCheckbox.checked = true;
            ageConfirmCheckbox.dispatchEvent(new Event('change'));

            //change age to 30
            const age30 = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
            dobInput.value = age30.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            //checkbox should still be checked
            expect(ageConfirmCheckbox.checked).toBe(true);
        });
    });

    //edge cases
    describe('Edge cases', () => {
        test('clears checkbox when DOB becomes invalid', () => {
            //valid DOB
            const today = new Date();
            const validDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
            dobInput.value = validDate.toISOString().split('T')[0];
            dobInput.dispatchEvent(new Event('input'));

            //checked box
            ageConfirmCheckbox.checked = true;

            //change to invalid DOB
            dobInput.value = '';
            dobInput.dispatchEvent(new Event('input'));

            //checkbox should be unchecked and errors cleared
            expect(ageConfirmCheckbox.checked).toBe(false);
            expect(ageConfirmCheckbox.classList.contains('error-border')).toBe(false);
        });
    });
});