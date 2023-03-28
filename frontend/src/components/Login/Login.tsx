import { useState } from 'react';

function Login() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="form-container sign-up-container">
            <form action="#">
                <h2>Create Account</h2>
                <label htmlFor="nickname">Email or nickname</label>
                <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default Login;
