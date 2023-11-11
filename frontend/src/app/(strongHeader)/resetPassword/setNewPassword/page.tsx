'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TextInput from '@components/FormInputs/TextInput';
import { isPasswordValidator } from '@helpers/validations';

type FeedbackMessage = {
    text: string;
    color: string;
};

const SetNewPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState<undefined | FeedbackMessage>(undefined);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConf) {
            setFeedbackMessage({ text: 'passwords do not match', color: '#ef4444' });
            return;
        }

        if (!token) {
            setFeedbackMessage({ text: 'no token set', color: '#ef4444' });
            return;
        }

        const res = await fetch('/service/auth/set-new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password, token: token }),
        });

        if (res.ok) {
            router.push('/authentication/login');
        }

        if (res.status === 401) {
            setFeedbackMessage({ text: 'reset failed', color: '#ef4444' });
            return;
        }
    };

    return (
        <div className="lg:w-screen lg:h-[90vh] lg:flex lg:justify-center lg:items-center lg:bg-green-custom1">
            <div className="w-full h-full bg-white-custom lg:relative lg:w-2/3 lg:max-w-[1700px] lg:h-3/4 lg:max-h-[600px] lg:rounded-[20px] lg:overflow-hidden">
                <form
                    className="px-10 pt-5 flex items-stretch gap-4 flex-col lg:h-[90vh] lg:pt-10"
                    action="#"
                    onSubmit={handleSubmit}
                >
                    <h2 className="h1 w-full text-left">Set your new password</h2>
                    <TextInput
                        value={password}
                        type="password"
                        required
                        validate={isPasswordValidator}
                        onChange={setPassword}
                        label="New password"
                        cypressID="new-password"
                    />
                    <TextInput
                        value={passwordConf}
                        type="password"
                        required
                        validate={isPasswordValidator}
                        onChange={setPasswordConf}
                        label="Repeat new password"
                        cypressID="repeat-new-password"
                    />
                    {feedbackMessage && (
                        <p className="text-sm mt-1" style={{ color: feedbackMessage.color }}>
                            {feedbackMessage.text}
                        </p>
                    )}
                    <input className="btn-primary mt-4" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default SetNewPassword;
