// Post code display and interaction validation tests

const fs = require('fs');
const path = require('path');

describe('Postal code field - conditional display (UK only)', () => {
    let html;
    let countrySelect;
    let postalCodeGroup;
    let postalCodeInput;
    let postalCodeError;

    beforeEach(() => {
        html = fs.readFileSync(path.resolve(__dirname, '../../../index.html'), 'utf-8');
        document.documentElement.innerHTML = html;

        jest.resetModules();
        require("../../unit/domHandlers.js");
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

        countrySelect = document.getElementById('country');
        postalCodeGroup = document.querySelector('.form-group:has(#postalCode)'); 
        postalCodeInput = document.getElementById('postalCode');
        postalCodeError = document.getElementById('postalCodeError');
    });


    // Field visibility tests
    
    describe('Field visibility', () => {
        test('postal code field is hidden by default', () => {
            expect(postalCodeGroup.style.display).toBe('none');
        });

        test('postal code field shows when UK is selected', () => {
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));
            
            expect(postalCodeGroup.style.display).toBe('block');
        });

        test('postal code field hides when US is selected', () => {
            // First show it
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));
            expect(postalCodeGroup.style.display).toBe('block');

            // Then hide it
            countrySelect.value = 'US';
            countrySelect.dispatchEvent(new Event('change'));
            expect(postalCodeGroup.style.display).toBe('none');
        });

        test('postal code field hides when Canada is selected', () => {
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));

            countrySelect.value = 'CA';
            countrySelect.dispatchEvent(new Event('change'));
            expect(postalCodeGroup.style.display).toBe('none');
        });

        test('postal code field hides when no country selected', () => {
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));

            countrySelect.value = '';
            countrySelect.dispatchEvent(new Event('change'));
            expect(postalCodeGroup.style.display).toBe('none');
        });
    });

  
    // UK only validation tests
   
    describe('UK Postal code validation', () => {
        beforeEach(() => {
            // select UK first
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));
        });

        test('shows error when postal code is empty', () => {
            postalCodeInput.value = '';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('error-border')).toBe(true);
            expect(postalCodeError.textContent).toBe('UK postal code is required.');
            expect(postalCodeError.style.display).toBe('block');
        });

        test('shows error for invalid format - all numbers', () => {
            postalCodeInput.value = '12345';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('error-border')).toBe(true);
            expect(postalCodeError.textContent).toContain('UK postal code format is invalid');
        });

        test('shows error for invalid format - wrong pattern', () => {
            postalCodeInput.value = 'ABCDEF';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('error-border')).toBe(true);
            expect(postalCodeError.style.display).toBe('block');
        });

        test('shows error for postal code with special characters', () => {
            postalCodeInput.value = 'SW1A@1AA';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('error-border')).toBe(true);
        });

        test('shows success for valid UK postal code with space', () => {
            postalCodeInput.value = 'SW1A 1AA';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('success-border')).toBe(true);
            expect(postalCodeError.textContent).toBe('');
            expect(postalCodeError.style.display).toBe('none');
        });

        test('shows success for valid UK postal code without space', () => {
            postalCodeInput.value = 'EC1A1BB';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('success-border')).toBe(true);
            expect(postalCodeError.textContent).toBe('');
        });

        test('accepts lowercase UK postal codes', () => {
            postalCodeInput.value = 'w1a 1aa';
            postalCodeInput.dispatchEvent(new Event('input'));

            expect(postalCodeInput.classList.contains('success-border')).toBe(true);
        });

        test('clears error when correcting invalid postal code', () => {
            postalCodeInput.value = '12345';
            postalCodeInput.dispatchEvent(new Event('input'));
            expect(postalCodeInput.classList.contains('error-border')).toBe(true);

            postalCodeInput.value = 'SW1A 1AA';
            postalCodeInput.dispatchEvent(new Event('input'));
            expect(postalCodeInput.classList.contains('error-border')).toBe(false);
            expect(postalCodeInput.classList.contains('success-border')).toBe(true);
        });
    });


    // workflows tests

    describe('user workflow', () => {
        test('user selects UK, enters postal code, then changes country - postal code field hides', () => {
            // Select UK
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));
            expect(postalCodeGroup.style.display).toBe('block');

            // Enter postal code
            postalCodeInput.value = 'SW1A 1AA';
            postalCodeInput.dispatchEvent(new Event('input'));
            expect(postalCodeInput.classList.contains('success-border')).toBe(true);

            // Change to US
            countrySelect.value = 'US';
            countrySelect.dispatchEvent(new Event('change'));
            expect(postalCodeGroup.style.display).toBe('none');
        });

        test('postal code value persists when switching back to UK', () => {
            // Select UK and enter postal code
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));
            postalCodeInput.value = 'SW1A 1AA';

            // Switch to US
            countrySelect.value = 'US';
            countrySelect.dispatchEvent(new Event('change'));

            // Switch back to UK
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));

            expect(postalCodeInput.value).toBe('SW1A 1AA');
        });

        test('form submission requires postal code only for UK', () => {
            const form = document.getElementById('registrationForm');
            const submitEvent = new Event('submit', { cancelable: true });

            // Try to submit with US (no postal code required)
            countrySelect.value = 'US';
            postalCodeInput.value = '';
            
        });
    });


    // Edge cases

    describe('Edge Cases', () => {
        test('handles rapid country switching', () => {
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));
            
            countrySelect.value = 'US';
            countrySelect.dispatchEvent(new Event('change'));
            
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));

            expect(postalCodeGroup.style.display).toBe('block');
        });

        test('clears postal code errors when switching to non-UK country', () => {
            countrySelect.value = 'GB';
            countrySelect.dispatchEvent(new Event('change'));

            postalCodeInput.value = 'invalid';
            postalCodeInput.dispatchEvent(new Event('input'));
            expect(postalCodeInput.classList.contains('error-border')).toBe(true);

            countrySelect.value = 'US';
            countrySelect.dispatchEvent(new Event('change'));
            
            // errors get cleared
            expect(postalCodeInput.classList.contains('error-border')).toBe(false);
            expect(postalCodeError.style.display).toBe('none');
        });
    });
});