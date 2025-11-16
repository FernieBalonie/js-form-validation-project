//Post code validation tests

const { validatePostalCode } = require('./validationLogic.js');

describe ('validatePostalCode - GB only', () => {
    
    //non-GB countries should return true for empty string
    test('returns true for empty postal code when country is US', () => {
        expect(validatePostalCode("", 'US')).toBe(true);
    });

   test('returns true for empty postal code when country is CA', () => {
            expect(validatePostalCode('', 'CA')).toBe(true);
        });

        test('returns true for any value when country is FR', () => {
            expect(validatePostalCode('anything', 'FR')).toBe(true);
        });

    //add more countries    
        test('returns true for empty postal code when country not selected', () => {
            expect(validatePostalCode('', '')).toBe(true);
        });
    });

//GB postal code validation

describe ('GB postal code validation', () => {
    test('returns false for empty postal code when selected country is GB', () => {
        expect(validatePostalCode("", 'GB')).toBe(false);
    });

    test('returns false for invalid GB format - all numbers', () => {
        expect(validatePostalCode("12345", 'GB')).toBe(false);
    });

    test('returns false for invalid GB format - all letters', () => {
        expect(validatePostalCode("abcde", 'GB')).toBe(false);
    });

    test('returns false for invalid GB format - wrong pattern', () => {
        expect(validatePostalCode("1A2B3C", 'GB')).toBe(false);
    });

    test('returns true for valid GB postal code', () => {
        expect(validatePostalCode("SW1A 1AA", 'GB')).toBe(true);
    });

    test('returns false for GB postal code with special characters', () => {
            expect(validatePostalCode('SW1A@1AA', 'GB')).toBe(false);
    });

    test('returns true for valid GB postal code with space', () => {
        expect(validatePostalCode('SW1A 1AA', 'GB')).toBe(true);
    });

    test('returns true for valid GB postal code without space', () => {
        expect(validatePostalCode('SW1A1AA', 'GB')).toBe(true);
    });

});
