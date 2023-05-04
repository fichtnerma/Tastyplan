import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import TextInput from '@components/FormInputs/TextInput';
import styles from './Login.module.scss';

interface LoginProps {
    visible: boolean;
}

export default function Login({ visible }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendData();
    };

    const sendData = async () => {
        const data = {
            userId: username,
            password: password,
        };
        const res = await signIn('credentials', {
            ...data,
            redirect: false,
        });

        if (!res?.ok) {
            setLoginFailed(true);
        } else {
            setLoginFailed(false);
            router.push('/setup');
        }
    };

    return (
        <div className={`${styles.loginContainer} ${visible && styles.active}`}>
            <form className="px-10 flex flex-col gap-4" action="#" onSubmit={handleSubmit}>
                <h2>Sign in</h2>
                <TextInput value={username} required onChange={setUsername} label="Username" />
                <TextInput value={password} type="password" required onChange={setPassword} label="Password" />
                <a href="#">Forgot your password?</a>
                <input type="submit" className="btn-primary" value="Sign in" />
                {loginFailed && <p className="m-0 text-red-custom">Login failed</p>}
            </form>
        </div>
    );
}
