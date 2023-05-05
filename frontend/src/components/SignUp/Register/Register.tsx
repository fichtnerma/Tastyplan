import React, { useState } from 'react';
import router from 'next/router';
import { useSession } from 'next-auth/react';
import TextInput from '@components/FormInputs/TextInput';
import { isEmailValidator, isPasswordValidator } from '@helpers/validations';
import { fetchWithAuth } from '@helpers/utils';
import styles from './Register.module.scss';

interface RegisterProps {
    visible: boolean;
    toggle: (activeForm: string) => void;
}

export default function Register({ visible }: RegisterProps) {
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
            firstName: 'Max',
            lastName: 'Mustermann',
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
            router.push(`${router.basePath}/authentication/login`, undefined, undefined);
        }
    };

    return (
        <div className={`${styles.registerContainer} ${visible && styles.active}`}>
            <form className="px-10 flex flex-col gap-4" action="#" onSubmit={handleSubmit}>
                <h3 className="mb-[-1rem]">Register</h3>
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
                <input type="submit" className="btn-primary float-right" value="Register" />
            </form>
        </div>
    );
}
