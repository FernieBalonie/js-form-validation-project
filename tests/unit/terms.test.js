// terms & conditions validation tests

const { validateTerms } = require('./validationLogic.js');

describe ('validateTerms', () => {
    
    test('returns false when not checked', () => {
        expect(validateTerms(false)).toBe(false);
    });

    test('returns true when checked', () => {
        expect(validateTerms(true)).toBe(true);
    });
});
