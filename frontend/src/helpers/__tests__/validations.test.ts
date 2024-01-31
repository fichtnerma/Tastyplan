import { isRequiredValidator, isEmailValidator, isPasswordValidator } from '../validations'; // Adjust the import path as per your project structure

describe('isRequiredValidator', () => {
    it('returns undefined when value is provided', () => {
        expect(isRequiredValidator('test')).toBeUndefined();
    });

    it('returns "Required" when value is not provided', () => {
        expect(isRequiredValidator('')).toEqual('Required');
    });
});

describe('isEmailValidator', () => {
    it('returns undefined for a valid email address', () => {
        expect(isEmailValidator('test@example.com')).toBeUndefined();
    });

    it('returns "Invalid email address" for an invalid email address', () => {
        expect(isEmailValidator('invalid-email')).toEqual('Invalid email address');
        expect(isEmailValidator('test@example')).toEqual('Invalid email address');
    });
});

describe('isPasswordValidator', () => {
    it('returns undefined for a password with at least 6 characters', () => {
        expect(isPasswordValidator('password')).toBeUndefined();
    });

    it('returns "Password must be at least 6 characters" for a password with less than 6 characters', () => {
        expect(isPasswordValidator('12345')).toEqual('Password must be at least 6 characters');
    });
});
