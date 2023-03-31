import { signIn } from 'next-auth/react';
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendData();      
    };

    const sendData = async () => {
        const data = {
            userId: username,
            password: password,
        };
        signIn('credentials', {
            ...data,
            redirect: true,
            callbackUrl: '/setup',
        });
    };

    return (
        <div className="w-full p-8">
            <form action="#" className="w-full h-full px-12" onSubmit={handleSubmit}>
                <fieldset className="flex flex-col h-full">
                    <legend className="h2 leading-[68px] mb-6">Sign in</legend>
                    <div className="text-input-wrapper mb-4 w-full">
                        <label htmlFor="accountName">E-Mail Adress or User Name</label>
                        <input
                            type="text"
                            name="accountName"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="text-input-wrapper mb-12 w-full">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary mt-auto mx-auto">Sign In</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
