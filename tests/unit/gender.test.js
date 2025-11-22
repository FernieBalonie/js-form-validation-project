const { validateGender } = require ('./validationLogic.js');

describe ('validateGender', () => {
    describe ('Valid gender options', () => {
        test('returns true for "female"', () => {
            expect (validateGender('female')).toBe(true);
        });
        test('returns true for "male"', () => {
            expect (validateGender('male')).toBe(true);

        });
        test('returns true for "other"', () => {
            expect (validateGender('other')).toBe(true);
        });

        test('returns false when no gender selected (empty)', () => {
            expect(validateGender('')).toBe(false);

        });

        test('returns false when gender is null', () => {
            expect(validateGender(null)).toBe(false);
        });

        test('returns false for invalid value', () => {
        expect(validateGender('invalid')).toBe(false);
        });
    }); 
});





