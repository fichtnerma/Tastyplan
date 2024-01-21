'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@components/Icon/Icon';
import TextInput from '@components/FormInputs/TextInput';

type SendMailData = {
    message: string;
};

type FeedbackMessage = {
    text: string;
    color: string;
};

const SendResetMailPage = () => {
    const [email, setEMail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState<undefined | FeedbackMessage>(undefined);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/service/auth/request-reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        if (res.ok) {
            setFeedbackMessage({ text: 'look into your mails', color: '#84cc16' });
            return;
        }

        if (res.status === 401) {
            setFeedbackMessage({ text: 'mail does not exist', color: '#ef4444' });
            return;
        }

        const data = (await res.json()) as SendMailData;
        setFeedbackMessage({ text: data.message, color: '#ef4444' });
    };

    return (
        <div className="lg:w-screen lg:h-[90vh] lg:flex lg:justify-center lg:items-center lg:bg-green-custom1">
            <div className="relative w-full h-full bg-white-custom lg:relative lg:w-2/3 lg:max-w-[1700px] lg:h-3/4 lg:max-h-[600px] lg:rounded-[20px] lg:overflow-hidden">
                <button className="absolute top-3 right-3" onClick={() => router.push('/')}>
                    <Icon icon="close"></Icon>
                </button>
                <form className="px-10 pt-5 flex items-stretch flex-col lg:pt-10" action="#" onSubmit={handleSubmit}>
                    <h2 className="h1 w-full text-left">Reset your password</h2>
                    <TextInput value={email} required onChange={setEMail} label="E-Mail" />
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

export default SendResetMailPage;
