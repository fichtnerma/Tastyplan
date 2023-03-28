import { useState } from 'react';

function Login({ onSubmit }: { onSubmit: () => void }) {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="basis-1/4">
            <form action="#" className="w-full h-full px-12">
                <fieldset className="flex flex-col items-center h-full">
                    <legend className="h2 leading-[68px] mb-10">Sign in</legend>
                    <div className="w-full text-input-wrapper mb-6">
                        <label htmlFor="accountName">E-Mail Adress or User Name</label>
                        <input type="text" name="accountName" />
                    </div>
                    <div className="w-full text-input-wrapper mb-12">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button className="btn-primary mt-auto mx-auto">Sign In</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
