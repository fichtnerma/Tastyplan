import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import TextInput from '@components/FormInputs/TextInput';
import { isEmailValidator, isPasswordValidator } from '@helpers/validations';
import { fetchWithAuth } from '@helpers/utils';
import styles from './Register.module.scss';

interface RegisterProps {
    visible: boolean;
    toggle: (activeForm: string) => void;
    onSkipRegistration: (evt: React.MouseEvent) => void;
}

export default function Register({ visible, onSkipRegistration }: RegisterProps) {
    const router = useRouter();

    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            userId: username,
            password: password,
            email: mail,
            role: 'user',
        };

        const response = await fetchWithAuth(
            '/service/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(data),
                redirect: 'follow',
            },
            session,
        );

        if (response.ok) {
            router.push(`/authentication/login`, undefined);
        }
    };

    const registerEnabled = (): boolean => {
        if (mail.length === 0 || username.length === 0 || password.length < 6 || passwordConf.length < 6) {
            return false;
        }

        if (isEmailValidator(mail)) {
            return false;
        }

        return true;
    };

    return (
        <div className={`${styles.registerContainer} ${visible && styles.active}`}>
            <form className="px-10 pb-7 flex flex-col gap-4" action="#" onSubmit={handleSubmit}>
                <h2 className="h1 !mb-0 lg:mb-auto">Register</h2>
                <TextInput value={username} required onChange={setUsername} label="Username" />
                <TextInput value={mail} validate={isEmailValidator} required onChange={setMail} label="E-Mail" />
                <TextInput
                    value={password}
                    type="password"
                    required
                    validate={isPasswordValidator}
                    onChange={setPassword}
                    label="Password"
                />
                <TextInput
                    value={passwordConf}
                    type="password"
                    required
                    validate={isPasswordValidator}
                    onChange={setPasswordConf}
                    label="Repeat Password"
                />
                <div className="flex justify-between">
                    <input
                        type="submit"
                        className="btn-primary float-right"
                        value="Register"
                        disabled={!registerEnabled()}
                    />
                    <button onClick={onSkipRegistration} className="btn-tertiary" data-cy="continue-as-guest-btn">
                        Continue as guest
                    </button>
                </div>
                <div className="flex flex-col items-center lg:hidden">
                    <p>Already have an account?</p>
                    <Link href={'/authentication/login'}>Sign in here</Link>
                </div>
            </form>
        </div>
    );
}
