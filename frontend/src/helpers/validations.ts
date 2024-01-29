export const isRequiredValidator = (value: string | number) => {
    return value ? undefined : 'Required';
};

export const isEmailValidator = (email: string) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email) ? undefined : 'Invalid email address';
};

export const isPasswordValidator = (value: string) => {
    return value.length < 6 ? 'Password must be at least 6 characters' : undefined;
};

