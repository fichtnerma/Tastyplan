import { useState } from 'react';

import { useRouter } from 'next/router';

import { APIRegistrationResponse, mailRegEx } from 'src/types/types';

import { toast } from 'react-toastify';

function Register() {
    const [mailAdress, setMailAdress] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let areInputsValid = true;

        if (!isMailValid() && mailAdress) {
            toast('Please enter a valid Mail', {
                hideProgressBar: true,
                autoClose: 3000,
                theme: 'colored',
                type: 'error',
            });
            areInputsValid = false;
        }

        if (checkEmptyInputs()) {
            areInputsValid = false;
        }

        if (password !== passwordConf) {
            toast('Passwords do not match', {
                hideProgressBar: true,
                autoClose: 3000,
                theme: 'colored',
                type: 'error',
            });
            areInputsValid = false;
        }

        if (!areInputsValid) return;

        sendData();
    };

    const checkEmptyInputs = (): boolean => {
        const toastMessages: string[] = [];
        let isAnyInputEmpty = false;

        if (!mailAdress || !nickname || !password || !passwordConf) isAnyInputEmpty = true;

        if (!mailAdress) toastMessages.push('Mail Adress is required');
        if (!nickname) toastMessages.push('Nickname is required');
        if (!password) toastMessages.push('Password is required');
        if (!passwordConf) toastMessages.push('Confirm your password');

        toastMessages.forEach((el) => {
            toast(el, {
                hideProgressBar: true,
                autoClose: 3000,
                theme: 'colored',
                type: 'error',
            });
        });

        return isAnyInputEmpty;
    };

    const isMailValid = (): boolean => {
        return mailRegEx.test(mailAdress) ? true : false;
    };

    const sendData = async () => {
        const data = {
            userId: nickname,
            password: password,
            email: mailAdress,
            firstName: 'firstname',
            lastName: 'lastName',
            role: 'user',
        };

        console.log(data);

        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = (await response.json()) as APIRegistrationResponse;

        if (responseData.status === 409) {
            toast('User already exists', {
                hideProgressBar: true,
                autoClose: 3000,
                theme: 'colored',
                type: 'error',
            });
        }

        if (response.ok) {
            router.push(`${router.basePath}/authentication/login`, undefined, undefined);
        }
    };

    return (
        <div className="w-full p-8">
            <form className="w-full h-full px-12" onSubmit={handleSubmit}>
                <fieldset className="flex flex-col h-full">
                    <legend className="h2 leading-[68px] mb-1">Register</legend>
                    <p className="text-xs mb-6">
                        Already have an account? Log in <a href="/">here!</a>
                    </p>
                    <div className="text-input-wrapper mb-4 w-full">
                        <label htmlFor="email">
                            E-Mail <span className="text-red-600 font-lg font-bold">*</span>{' '}
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={mailAdress}
                            onChange={(e) => setMailAdress(e.target.value)}
                        />
                    </div>
                    <div className="text-input-wrapper mb-4 w-full">
                        <label htmlFor="nickname">
                            Nickname <span className="text-red-600 font-lg font-bold">*</span>{' '}
                        </label>
                        <input
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                    <div className="text-input-wrapper mb-4 w-full">
                        <label htmlFor="password">
                            Password <span className="text-red-600 font-lg font-bold">*</span>{' '}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-input-wrapper w-full">
                        <label htmlFor="passwordConfirmation">
                            Confirm Password <span className="text-red-600 font-lg font-bold">*</span>{' '}
                        </label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            value={passwordConf}
                            onChange={(e) => setPasswordConf(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary mt-auto mx-auto" type="submit">
                        Sign up
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default Register;
