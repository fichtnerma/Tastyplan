import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

    const loginEnabled = (): boolean => {
        if (username.length === 0 || password.length === 0) {
            return false;
        }

        return true;
    };

    return (
        <div className={`${styles.loginContainer} ${visible && styles.active}`}>
            <form className="px-10 mb-10 flex items-stretch flex-col gap-4" action="#" onSubmit={handleSubmit}>
                <h2 className="h1 w-full text-left">Sign in</h2>
                <TextInput value={username} required onChange={setUsername} label="Username" />
                <TextInput value={password} type="password" required onChange={setPassword} label="Password" />
                <div className="flex flex-col items-center mt-6 lg:items-start">
                    <Link href="#" className="btn-tertiary mb-6">
                        Forgot your password?
                    </Link>
                    <input type="submit" className="btn-primary" value="Sign in" disabled={!loginEnabled()} />
                </div>
                {loginFailed && <p className="m-0 text-red-custom">Login failed</p>}
            </form>
            <div className=" flex-col items-center w-full flex lg:hidden">
                <p className="">New here?</p>
                <Link href="/authentication/registration">Register here!</Link>
            </div>
        </div>
    );
}
