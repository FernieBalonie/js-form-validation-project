
const { validatePhone } = require ('./validationLogic.js');

describe ('validatePhone', () => {
    
    describe ('Country code validation',() => {
        test ('returns false when country is empty', () => {
            expect (validatePhone ('1234567890', '')).toBe(false);

        });

        test ('returns false when country code is null', () => {
            expect (validatePhone('1234567890', null)).toBe(false);

        });

        test ('returns false when country code is undefined', () => {
            expect (validatePhone('1234567890', undefined)).toBe(false);

        });

        test ('returns false is country code is whitespace only', () => {
            expect (validatePhone('1234567890', '   ')).toBe(false);
        
        });

    });    
    describe ('Phone number validation',() => {
        test ('returns false when phone number is empty', () => {
            expect (validatePhone ('', '+1')).toBe(false);

        });

        test ('returns false when phone number is whitespace only', () => {
            expect (validatePhone('  ', '+1')).toBe(false);

        });

        test ('returns false when phone number is null', () => {
            expect (validatePhone(null, '+1')).toBe(false);     
        });
});

    describe ('Phone number format validation', () => {
        test ('returns true for valid number with spaces', () => {  
            expect(validatePhone('123 456 7890', '+1')).toBe(true);
        });

        test ('returns true for valid number with hyphens', () => {
            expect(validatePhone('123-456-7890', '+1')).toBe(true);
        });

        test ('returns true for valid number with parentheses', () => {
            expect(validatePhone('(123) 456-7890', '+1')).toBe(true);
        });

        test ('returns true for valid international number', () => {
            expect (validatePhone('2012345678', '+44')).toBe(true);
        });
        
        test ('returns false for number with letters', () => {
            expect (validatePhone('abc1234567', '+1')).toBe(false);
        });

        test ('returns false for number with special characters (except hyphens and parentheses)', () => {
            expect (validatePhone('555@123#876', '+1')).toBe(false);    

        });
    });
    
    describe('Phone number length validation', () => {
        test ('returns false for number too short (less than 7 digits)', () => {
            expect(validatePhone('123456', '+1')).toBe(false);

        });

        test ('returns false for number too long (more than 15 digits)', () => {
            expect(validatePhone('1234567890123456', '+1')).toBe(false);
        
        });

        test ('returns true for minimum valid length (7 digits)', () => {
            expect (validatePhone('1234567', '+1')).toBe(true);
        });
        
        test('returns true for maximum valid length (15 digits)', () => {
            expect (validatePhone('123456789012345', '+1')).toBe(true);
        });
    
         test ('returns true for valid 10-digit US number', () => {
            expect(validatePhone('1234567890', '+1')).toBe(true);
        });
    });

     describe('Edge cases', () => {
        test('returns true for number with mixed formatting', () => {
            expect(validatePhone('(555) 123-4567', '+44')).toBe(true);
        });

        test('returns true for number with only spaces between digits', () => {
            expect(validatePhone('555 123 4567', '+91')).toBe(true);
        });

        test('returns false for number starting with special character', () => {
            expect(validatePhone('+1234567890', '+1')).toBe(false);
        });

        test('returns true for 8-digit number (valid for some countries)', () => {
            expect(validatePhone('12345678', '+852')).toBe(true);
        });
    });

    describe('Country-specific examples', () => {
        test('validates US number correctly', () => {
            expect(validatePhone('202-555-0123', '+1')).toBe(true);
        });

        test('validates UK number correctly', () => {
            expect(validatePhone('20 7946 0958', '+44')).toBe(true);
        });

        test('validates Indian number correctly', () => {
            expect(validatePhone('98765 43210', '+91')).toBe(true);
        });

        test('validates German number correctly', () => {
            expect(validatePhone('30 12345678', '+49')).toBe(true);
        });
    });
});

    
    
