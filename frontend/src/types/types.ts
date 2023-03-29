export const mailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export type APIRegistrationResponse = {
    response: string;
    status: number;
    message: string;
    name: string;
};

export type UserCredentials = {
    userId: string;
    password: string;
};
