import TextInput from '@components/FormInputs/TextInput';
import Icon from '@components/Icon/Icon';
import React, { useState } from 'react';
import styles from './Register.module.scss';
import { isEmailValidator, isPasswordValidator } from '@helpers/validations';
import { APIRegistrationResponse } from 'src/types/types';

interface RegisterProps {
    visible: boolean;
    toggle: (activeForm: string) => void;
}

export default function Register({ visible }: RegisterProps) {
    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const data = {
            userId: username,
            password: password,
            email: mail,
            role: 'user',
        };

        console.log(data);

        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = (await response.json()) as APIRegistrationResponse;

        // if (response.ok) {
        //     router.push(`${router.basePath}/authentication/login`, undefined, undefined);
        // }
    };

    return (
        <div className={`${styles.registerContainer} ${visible && styles.active}`}>
            <form className='px-10 flex flex-col gap-4' action="#" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <TextInput
                    value={username}
                    required
                    onChange={setUsername}
                    label="Username"
                    
                />

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
                <input type='submit' className='btn-primary float-right'>Sign Up</input>
            </form>
        </div>
    );
}
