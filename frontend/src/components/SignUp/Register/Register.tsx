import TextInput from '@components/FormInputs/TextInput';
import Icon from '@components/Icon/Icon';
import React, { useState } from 'react';
import styles from './Register.module.scss';
import { isEmailValidator, isPasswordValidator } from '@helpers/validations';

interface RegisterProps {
    visible: boolean;
    toggle: (activeForm: string) => void;
}

export default function Register({ visible }: RegisterProps) {
    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    return (
        <div className={`${styles.registerContainer} ${visible && styles.active}`}>
            <form className='px-10 flex flex-col gap-4' action="#">
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
                <button className='btn-primary float-right'>Sign Up</button>
            </form>
        </div>
    );
}
