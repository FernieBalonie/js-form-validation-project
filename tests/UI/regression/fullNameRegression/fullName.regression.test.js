/**
 * @jest-environment jsdom
 *
 * Tests DOM manipulation, css classes, error messages visibility and user workflows for full name field
 * 
 */

/*Test Case Failures: 
- fullName feedback not functional after modyfying code structure
- Error messages and success messages are not showing/red and green border not showing/no feedback given to user
- Unit tests for fullName all passed, which means the code is working as expected but the UI is not.
  PROBLEM: I had previously loaded the html followed by the handlers. However, I set the innerHTML of the document in jest jsdom 
  at the top of this test file, which meant that the DOM was loaded but the DOMContentLoaded event was not triggered. 
  SOLUTION: I manually triggered the DOMContentLoaded event in the test file.

  Smaller bugs fixed: file paths and error messages.*/


const fs = require('fs');
const path = require('path');

/* Double checking that the path is correct 
console.log('Current directory:', __dirname);
console.log('Trying HTML at:', path.resolve(__dirname, '../../../index.html'));
console.log('HTML exists?', fs.existsSync(path.resolve(__dirname, '../../../index.html')));
console.log('Trying domHandlers at:', path.resolve(__dirname, '../../unit/domHandlers.js'));
console.log('domHandlers exists?', fs.existsSync(path.resolve(__dirname, '../../unit/domHandlers.js')));
*/

describe("full name input - UI regression tests", () => {
    let html;
    let nameInput;
    let nameError;

    beforeEach(() => {
        // load HTML and initialize DOM
        html = fs.readFileSync(path.resolve(__dirname, '../../../../index.html'), 'utf-8');
        document.documentElement.innerHTML = html;

        // initialize DOM handlers
        jest.resetModules(); 
        require("../../../unit/domHandlers.js");
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

        // cache DOM elements
        nameInput = document.getElementById('fullName');
        nameError = document.getElementById('nameError');
    });

    describe("DOM element existence", () => {
        test("required DOM elements exist in the page", () => {
            expect(nameInput).toBeTruthy();
            expect(nameError).toBeTruthy();
            expect(document.getElementById('registrationForm')).toBeTruthy();
        });

        test("input has correct initial attributes", () => {
            expect(nameInput.type).toBe('text');
            expect(nameInput.id).toBe('fullName');
        });
    });

    describe("empty input validation", () => {
        test("shows error border when input is empty", () => {
            nameInput.value = "";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('error-border')).toBe(true);
            expect(nameInput.classList.contains('success-border')).toBe(false);
        });

        test("displays correct error message for empty input", () => {
            nameInput.value = "";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameError.textContent).toBe('Full name is required.');
            expect(nameError.textContent.length).toBeGreaterThan(0);
        });

        test("error message is visible when input is empty", () => {
            nameInput.value = "";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameError.style.display).toBe('block');
        });
    });

    describe("Single name validation", () => {
        test("shows error border when only first name entered", () => {
            nameInput.value = "Fernanda";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('error-border')).toBe(true);
            expect(nameInput.classList.contains('success-border')).toBe(false);
        });

        test("displays correct error message for single name", () => {
            nameInput.value = "Fernie";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameError.textContent).toBe('Please enter your first and last name.');
        });

        test("error is visible and accessible", () => {
            nameInput.value = "Fernanda";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameError.style.display).toBe('block');
            expect(nameError.textContent).not.toBe('');
        });
    });

    describe("Invalid characters validation", () => {
        test("shows error for names with numbers", () => {
            nameInput.value = "Fernanda123 Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('error-border')).toBe(true);
            expect(nameError.textContent).toBe('Name can only contain letters, accents, spaces, hyphens.');
        });

        test("shows error for names with special characters", () => {
            nameInput.value = "Fernanda@ Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('error-border')).toBe(true);
            expect(nameError.textContent).toBe('Name can only contain letters, accents, spaces, hyphens.');
            expect(nameError.style.display).toBe('block');
        });

        test("shows error for names with emojis", () => {
            nameInput.value = "Fernanda 😊 Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('error-border')).toBe(true);
            expect(nameError.style.display).toBe('block');
        });
    });

    describe("Valid input success state", () => {
        test("shows success border for valid two-word name", () => {
            nameInput.value = "Fernanda Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
            expect(nameInput.classList.contains('error-border')).toBe(false);
        });

        test("hides error message for valid input", () => {
            nameInput.value = "Fernie Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameError.textContent).toBe('');
            expect(nameError.style.display).toBe('none');
        });

        test("accepts names with hyphens", () => {
            nameInput.value = "Mary-Jane Spider Man";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
            expect(nameError.textContent).toBe('');
        });

        test("accepts names with apostrophes", () => {
            nameInput.value = "O'Conner Fernie";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
            expect(nameError.style.display).toBe('none');
        });

        test("accepts names with accents", () => {
            nameInput.value = "José García";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
            expect(nameError.textContent).toBe('');
        });

        test("accepts names with multiple words", () => {
            nameInput.value = "Fernanda Amador Mauri Rodriguez";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
        });
    });

    describe("css class manipulation", () => {
        test("removes success border when input becomes invalid", () => {
            // first make it valid
            nameInput.value = "Fernanda Mauri";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameInput.classList.contains('success-border')).toBe(true);

            // then invalid
            nameInput.value = "Fernanda";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameInput.classList.contains('success-border')).toBe(false);
            expect(nameInput.classList.contains('error-border')).toBe(true);
        });

        test("removes error border when input becomes valid", () => {
            // first trigger error
            nameInput.value = "Fernanda";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameInput.classList.contains('error-border')).toBe(true);

            // then fix it
            nameInput.value = "Fernanda Mauri";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameInput.classList.contains('error-border')).toBe(false);
            expect(nameInput.classList.contains('success-border')).toBe(true);
        });

        test("only one border class is applied at a time", () => {
            nameInput.value = "Fernanda Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            const hasError = nameInput.classList.contains('error-border');
            const hasSuccess = nameInput.classList.contains('success-border');
            
            // should never have both classes at once
            expect(hasError && hasSuccess).toBe(false);
            // should have exactly one
            expect(hasError || hasSuccess).toBe(true);
        });
    });

    describe("Error message display state", () => {
        test("error message display changes from none to block", () => {
            // initially should be hidden or none
            nameInput.value = "Valid Name";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameError.style.display).toBe('none');

            // then show error
            nameInput.value = "";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameError.style.display).toBe('block');
        });

        test("error message content changes based on validation type", () => {
            // test empty
            nameInput.value = "";
            nameInput.dispatchEvent(new Event('input'));
            const emptyError = nameError.textContent;

            // test single name
            nameInput.value = "Fernanda";
            nameInput.dispatchEvent(new Event('input'));
            const singleNameError = nameError.textContent;

            // test invalid characters
            nameInput.value = "Fernanda123 Mauri";
            nameInput.dispatchEvent(new Event('input'));
            const invalidCharError = nameError.textContent;

            // all errors should be different
            expect(emptyError).not.toBe(singleNameError);
            expect(singleNameError).not.toBe(invalidCharError);
            expect(emptyError).not.toBe(invalidCharError);
        });
    });

    describe("User interaction workflows", () => {
        test("user can correct error and see success state", () => {
            // user types incomplete name
            nameInput.value = "Fernanda";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameInput.classList.contains('error-border')).toBe(true);

            // user completes the name
            nameInput.value = "Fernanda Mauri";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameInput.classList.contains('success-border')).toBe(true);
            expect(nameError.textContent).toBe('');
        });

        test("user can see different errors as they type", () => {
            // start with invalid characters
            nameInput.value = "Test123 User456";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameError.textContent).toContain('letters');

            // remove to single word
            nameInput.value = "Test";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameError.textContent).toContain('first and last name');

            // clear completely
            nameInput.value = "";
            nameInput.dispatchEvent(new Event('input'));
            expect(nameError.textContent).toContain('required');
        });

        test("blur event also triggers validation", () => {
            nameInput.value = "Invalid123";
            nameInput.dispatchEvent(new Event('blur'));
            
            expect(nameInput.classList.contains('error-border')).toBe(true);
            expect(nameError.style.display).toBe('block');
        });
    });

    describe("Edge cases", () => {
        test("handles extra whitespace correctly", () => {
            nameInput.value = "  Fernanda   Mauri  ";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
        });

        test("treats multiple spaces as single separator", () => {
            nameInput.value = "Fernanda    Mauri";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
        });

        test("handles very long names", () => {
            nameInput.value = "Extraordinarily-Long-First-Name Incredibly-Long-Last-Name O-M-G";
            nameInput.dispatchEvent(new Event('input'));
            
            expect(nameInput.classList.contains('success-border')).toBe(true);
        });
    });
});

describe ("UI Regression Test for full name input", () => {
    let html;

    beforeEach(() => {
        html = fs.readFileSync(path.resolve(__dirname, '../../../../index.html'), 'utf-8'); // load html into jest jsdom
        document.documentElement.innerHTML = html;

        jest.resetModules(); 
        require("../../../unit/domHandlers.js");
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event); //manually trigger the DOMContentLoaded event
    });

    test ("shows red border + error message when invalid", () => {
        const nameInput = document.getElementById('fullName');
        const nameError = document.getElementById('nameError');

        nameInput.value = ""; //invalid input
        nameInput.dispatchEvent(new Event('input'));
        expect(nameInput.classList.contains('error-border')).toBe(true);
        expect(nameError.textContent).toBe('Full name is required.');
        expect(nameError.style.display).toBe('block');
        expect(nameError.textContent.length).toBeGreaterThan(0); // check if error message is not empty


        nameInput.value = "Fernanda"; //invalid input
        nameInput.dispatchEvent(new Event('input'));
        expect(nameInput.classList.contains('error-border')).toBe(true);
        expect(nameError.textContent).toBe('Please enter your first and last name.');
        expect(nameError.style.display).toBe('block');
        expect(nameError.textContent.length).toBeGreaterThan(0); // check if error message is not empty

        nameInput.value = "Fernanda123 Mauri"; //invalid input
        nameInput.dispatchEvent(new Event('input'));
        expect(nameInput.classList.contains('error-border')).toBe(true);
        expect(nameError.textContent).toBe('Name can only contain letters, accents, spaces, hyphens.');
        expect(nameError.style.display).toBe('block');
        expect(nameError.textContent.length).toBeGreaterThan(0); // check if error message is not empty

    
    });

    test ("shows green border + success message when valid", () => {
        const nameInput = document.getElementById('fullName');
        const nameError = document.getElementById('nameError');

        nameInput.value = "Fernanda Mauri"; //valid input
        nameInput.dispatchEvent(new Event('input'));
        expect(nameInput.classList.contains('success-border')).toBe(true);
        expect(nameError.textContent).toBe('');
        expect(nameError.style.display).toBe('none'); // check if error message is empty
    });
});
    

