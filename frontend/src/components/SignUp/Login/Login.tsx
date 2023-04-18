import TextInput from '@components/FormInputs/TextInput';
import Icon from '@components/Icon/Icon';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import styles from './Login.module.scss';

interface LoginProps {
    visible: boolean;
}

export default function Login({ visible }: LoginProps) {
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
        <div className={`${styles.loginContainer} ${visible && styles.active}`}>
            <form className='px-10 flex flex-col gap-4' action="#" onSubmit={handleSubmit}>
                <h2>Sign in</h2>
                <TextInput
                    value={username}
                    required
                    onChange={setUsername}
                    label="Username"
                />
                <TextInput
                    value={password}
                    type="password"
                    required
                    onChange={setPassword}
                    label="Password"
                />
                <a href="#">Forgot your password?</a>
                <button className='btn-primary'>Sign In</button>
            </form>
        </div>
    );
}
