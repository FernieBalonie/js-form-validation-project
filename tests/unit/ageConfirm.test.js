// Age confirmation checkbox validation

const { validateAgeConfirmation } = require('./validationLogic.js');

describe('validateAgeConfirmation', () => {
    //checkbox check
    test('returns false when checkbox is not checked (false)', () => {
        expect(validateAgeConfirmation(false)).toBe(false);
    });

    test('returns true when checkbox is checked (true)', () => {
        expect(validateAgeConfirmation(true)).toBe(true);
    });
});

