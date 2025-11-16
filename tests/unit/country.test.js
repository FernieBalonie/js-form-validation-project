//Country validation tests

const { validateCountry } = require('./validationLogic.js');

describe ('validateCountry', () => {
    //empty check
    test('returns false for empty string', () => {
        expect(validateCountry("")).toBe(false);
    });

    //default placeholder check
    test('returns false for default placeholder value', () => {
        expect(validateCountry('Select a country')).toBe(false);
    });

    //valid country check
    test('returns true for valid country code', () => {
        expect(validateCountry('US')).toBe(true);
    });

    //country code check
    test('returns true for all country codes', () => {
        const validCodes = ['CA', 'MX', 'GB', 'AU', 'IN', 'FR', 'DE', 'IT', 'ES', 'CN', 'JP', 'KR', 'BR', 'RU', 'SA', 'EG', 'TN', 'MA'];
        validCodes.forEach(code => {
            expect(validateCountry(code)).toBe(true);
        });
    });

}); 