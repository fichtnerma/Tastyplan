import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import TextInput from '@components/FormInputs/TextInput';
import ErrorMessage from '@components/common/ErrorMessage';
import styles from './Login.module.scss';

interface LoginProps {
    visible: boolean;
}

export default function Login({ visible }: LoginProps) {
    const [email, setEMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendData();
    };

    const sendData = async () => {
        const data = {
            userId: email,
            password: password,
        };
        const res = await signIn('credentials', {
            ...data,
            redirect: false,
        });

        if (res?.ok) {
            router.push('/setup');
        } else {
            if (res?.status === 401) {
                setError('Wrong email or password.');
            } else {
                setError("Couldn't sign in");
            }
        }
    };

    const loginEnabled = (): boolean => {
        if (email.length === 0 || password.length === 0) {
            return false;
        }

        return true;
    };

    return (
        <div className={`${styles.loginContainer} ${visible && styles.active}`}>
            <form className="px-10 mb-10 flex items-stretch flex-col gap-4" action="#" onSubmit={handleSubmit}>
                <h2 className="h1 w-full text-left">Sign in</h2>
                <TextInput
                    hasError={error != ''}
                    id="login-mail"
                    value={email}
                    required
                    onChange={setEMail}
                    label="E-Mail"
                />
                <TextInput
                    hasError={error != ''}
                    id="login-password"
                    value={password}
                    type="password"
                    required
                    onChange={setPassword}
                    label="Password"
                    cypressID="password-login"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className="flex flex-col items-center mt-6 lg:items-start">
                    <Link href="/resetPassword/sendResetMail" className="btn-tertiary mb-6">
                        Forgot your password?
                    </Link>
                    <input
                        type="submit"
                        className="btn-primary"
                        value="Sign in"
                        disabled={!loginEnabled()}
                        data-cy="submit-login"
                    />
                </div>
            </form>
            <div className=" flex-col items-center w-full flex lg:hidden">
                <p className="">New here?</p>
                <Link href="/authentication/registration">Register here!</Link>
            </div>
        </div>
    );
}
