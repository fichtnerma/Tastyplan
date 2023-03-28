import { useState } from 'react';

function Login({ onSubmit }: { onSubmit: () => void }) {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="basis-1/2 form-container sign-in-container">
            <form action="#" className="flex flex-col items-center w-full px-12">
                <h1>Sign in</h1>
                <div className="w-full text-input-wrapper mb-6">
                    <label htmlFor="accountName">E-Mail Adress or User Name</label>
                    <input type="text" name="accountName" />
                </div>
                <div className="w-full text-input-wrapper mb-12">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <a href="#" className="mb-4">
                    Forgot your password?
                </a>
                <button className="btn-primary">Sign In</button>
            </form>
        </div>
    );
}

export default Login;
