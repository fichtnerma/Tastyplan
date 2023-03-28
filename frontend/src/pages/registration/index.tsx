import { toast } from 'react-toastify';
import { useState } from 'react';
import { APIRegistrationResponse, mailRegEx } from 'src/types/types';

function RegistrationPage() {
    const [mailAdress, setMailAdress] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

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
        let toastMessages: string[] = [];
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
    };

    return (
        <div className="flex justify-center">
            <div className="flex bg-white rounded-[30px] p-5">
                <div className="flex flex-col basis-2/5 rounded-[20px] p-6 bg-green-custom2">
                    <h2 className="h2-white">Welcome to Tastyplan</h2>
                    <p className="text-white">Already have an Account?</p>
                </div>
                <form className="basis-3/5 bg-white px-4" onSubmit={handleSubmit}>
                    <fieldset className="pl-12 pr-4">
                        <legend className="h2 leading-[68px] mb-1">Register</legend>
                        <p className="text-xs mb-10">
                            Already have an account? Log in <a href="/">here!</a>
                        </p>
                        <div className="flex flex-col">
                            <div className="text-input-wrapper mb-6">
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
                            <div className="text-input-wrapper mb-6">
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
                            <div className="text-input-wrapper mb-6">
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
                            <div className="text-input-wrapper mb-10">
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
                            <button className="btn-submit ml-auto mr-0" type="submit">
                                Create Account
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;
