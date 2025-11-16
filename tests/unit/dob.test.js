// Date of birth validation tests

const { validateDOB } = require('./validationLogic.js');

describe ('validateDOB', () => {
    //empty check
    test('returns false for empty string', () => {
        expect(validateDOB('')).toBe(false);
    });

    //future date check
    test('returns false for future date', () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const futureDateStr = futureDate.toISOString().split('T')[0];
        expect(validateDOB(futureDateStr)).toBe(false); 
    });

    //under 16 years old check
    test('returns false for user under 16 years old', () => {
        const today = new Date();
        const under16 = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
        const under16Str = under16.toISOString().split('T')[0];
        expect(validateDOB(under16Str)).toBe(false);
    });

    test('returns false for user over 100 years old', () => {
        const today = new Date();
        const over100 = new Date(today.getFullYear() - 101, today.getMonth(), today.getDate());
        const over100Str = over100.toISOString().split('T')[0];
        expect(validateDOB(over100Str)).toBe(false);
    });

    test('returns true for valid date (16+ years old)', () => {
        const today = new Date();
        const valid = new Date(today.getFullYear() - 19, today.getMonth(), today.getDate());
        const validStr = valid.toISOString().split('T')[0];
        expect(validateDOB(validStr)).toBe(true);
    });

    test('returns true for exactly 16 years old', () => {
        const today = new Date();
        const exactly16 = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate() - 1);
        const exactly16Str = exactly16.toISOString().split('T')[0];
        expect(validateDOB(exactly16Str)).toBe(true);
    });

    test('returns true for 100 years old (edge case)', () => {
        const today = new Date();
        const exactly100 = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        const exactly100Str = exactly100.toISOString().split('T')[0];
        expect(validateDOB(exactly100Str)).toBe(true);
    });
});