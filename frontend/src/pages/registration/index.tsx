import { useState } from 'react';

function RegistrationPage() {
    const [mailAdress, setMailAdress] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConf) return;

        const data = {
            userId: nickname,
            password: password,
            email: mailAdress,
            firstName: 'firstname',
            lastName: 'lastName',
            role: 'user',
        };

        console.log(data);

        fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) response.json();
            })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex justify-center">
            <div className="flex bg-white rounded-[30px] p-5">
                <div className="flex flex-col bg-green-custom1 rounded-[20px] p-6">
                    <h2>Welcome to Tastyplan</h2>
                    <p>Already have an Account?</p>
                </div>
                <form className="w-[36rem] bg-white px-4" onSubmit={handleSubmit}>
                    <fieldset className="pl-12 pr-4">
                        <legend className="h2-black">Register</legend>
                        <p className="text-xs mb-10">
                            Already have an account? Log in <a href="/">here!</a>
                        </p>
                        <div className="flex flex-col">
                            <div className="text-input-wrapper mb-6">
                                <label htmlFor="email">E-Mail Adress</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={mailAdress}
                                    onChange={(e) => setMailAdress(e.target.value)}
                                />
                            </div>
                            <div className="text-input-wrapper mb-6">
                                <label htmlFor="nickname">Nickname</label>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                            <div className="text-input-wrapper mb-6">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-input-wrapper mb-8">
                                <label htmlFor="passwordConfirmation">Confirm Password</label>
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
