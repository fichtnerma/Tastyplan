'use client';

import React, { useState } from 'react';
import TextInput from '@components/FormInputs/TextInput';

type SendMailData = {
    message: string;
};

const SendResetMailPage = () => {
    const [email, setEMail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/service/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        if (res.ok) {
            setFeedbackMessage('Look into your mails');
            return;
        }

        if (res.status === 401) {
            setFeedbackMessage('Mail does not exist');
            return;
        }

        const data = (await res.json()) as SendMailData;

        setFeedbackMessage(data.message);
    };

    return (
        <div className="lg:w-screen lg:h-[90vh] lg:flex lg:justify-center lg:items-center lg:bg-green-custom1">
            <div className="w-full h-full bg-white-custom lg:relative lg:w-2/3 lg:max-w-[1700px] lg:h-3/4 lg:max-h-[600px] lg:rounded-[20px] lg:overflow-hidden">
                <form
                    className="px-10 pt-5 flex items-stretch flex-col lg:h-[90vh] lg:pt-10"
                    action="#"
                    onSubmit={handleSubmit}
                >
                    <h2 className="h1 w-full text-left">Reset your password</h2>
                    <TextInput value={email} required onChange={setEMail} label="E-Mail" />
                    {feedbackMessage && <p className="text-sm text-red-400 mt-1">{feedbackMessage}</p>}
                    <input className="btn-primary mt-4" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default SendResetMailPage;
