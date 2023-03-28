import { useState } from 'react';

function Login({ onSubmit }: { onSubmit: () => void }) {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="p-12 form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <span>or use your account</span>
                <div className="text-input-wrapper mb-6">
                    <label htmlFor="accountName">E-Mail Adress or User Name</label>
                    <input type="text" name="accountName" />
                </div>
                <div className="text-input-wrapper mb-12">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default Login;
