// Test Suites

// Full Name
const { validateName} = require ('./validationLogic.js');
// Test Cases
describe ('validateName', () => {
    test('returns false for empty string', () => {
        expect(validateName("")).toBe(false);
    });

    test('returns false for string with only hyphens', () => {
        expect(validateName("-----")).toBe(false);
    });

    test('returns false for single name', () => {
        expect(validateName("Fernanda")).toBe(false);
    });

    test('returns true for valid full name', () => {
        expect(validateName("Fernanda Mauri")).toBe(true);
    });

    test('returns false for name with invalid characters', () => {
        expect(validateName("John Doe!")).toBe(false);
    });
});
