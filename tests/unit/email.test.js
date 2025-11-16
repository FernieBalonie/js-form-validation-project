/* Test Suites

 Email */

//import logic function first
const { validateEmail } = require('./validationLogic.js'); 

// Test Cases
describe ('validateEmail', () => {
    test('returns false for empty string', () => {
        expect(validateEmail("")).toBe(false);
    });

    test('returns false for string with whitespace only', () => {
        expect(validateEmail("   ")).toBe(false);
    });

    test('returns false for email without @', () => {
        expect(validateEmail("testemail.com")).toBe(false);
    });

    test('returns false for email without domain', () => {
        expect(validateEmail("testemail@")).toBe(false);
    });

    test('returns false for email with without username', () => {
        expect(validateEmail("@example.com")).toBe(false);
    });

    test('returns false for email without TDL', () => {
        expect(validateEmail("test@example")).toBe(false);
    
    });

    test('returns false for email with spaces', () => {
        expect(validateEmail("test email@exa&ple.com")).toBe(false);
    });

    test('returns false for email with multipe @', () => {
        expect(validateEmail("test@@example.com")).toBe(false);
    });

    test('returns false for email with consecutive .', () => {
        expect(validateEmail("test@example..com")).toBe(false);
    });

    test('returns true for valid email', () => {
        expect(validateEmail("test@example.com")).toBe(true);
    });

    test('returns true for email with numbers', () => {
        expect(validateEmail("test123@example.com")).toBe(true);
    });

    test('returns true for email with dots', () => {
        expect(validateEmail("test.user@example.com")).toBe(true);
    });

    test('returns true for email with hyphens', () => {
        expect(validateEmail("test-user@example.com")).toBe(true);
    });

    test('returns true for email with underscores', () => {
        expect(validateEmail("test_user@example.com")).toBe(true);
    });

    test('returns true for email with subdomain', () => {
        expect(validateEmail("test@mail.example.com")).toBe(true);
    }); 

    test('trim whitespace before validation', () => {
        expect(validateEmail("   test@example.com   ")).toBe(true);
    });
});

