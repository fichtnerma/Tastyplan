'use client';
import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { CSSTransition } from 'react-transition-group';
import Icon from '@components/Icon/Icon';
import Register from './Register/Register';
import Overlay from './Overlay/Overlay';
import Login from './Login/Login';

interface SignUpProps {
    currentForm: string;
    setRoute: (route: string) => void;
}

export default function SignUp({ currentForm, setRoute }: SignUpProps) {
    const isLogin = currentForm === 'login' ? true : false;
    const nodeRef = React.useRef(null);
    const nodeRef2 = React.useRef(null);

    const toggleForm = (activeForm: string) => {
        setRoute(activeForm);
    };

    const skipRegistration = (evt: React.MouseEvent) => {
        evt.preventDefault();
        signIn('credentials', {
            redirect: true,
            callbackUrl: '/setup',
        });
        fetch('/api/auth/skip-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
    };

    return (
        <>
            <div
                className={`hidden absolute cursor-pointer z-50 top-3 transition-all ease-in-out duration-700 right-4 ${
                    isLogin ? 'text-white-custom' : 'text-black'
                } lg:block`}
            >
                <Link href="/">
                    <Icon size={20} icon="close" />
                </Link>
            </div>
            {isLogin ? (
                <CSSTransition in={isLogin} timeout={600} nodeRef={nodeRef} classNames="fade-left">
                    <div ref={nodeRef}>
                        <Login visible={isLogin} />
                    </div>
                </CSSTransition>
            ) : (
                <CSSTransition in={isLogin} timeout={600} nodeRef={nodeRef2} classNames="fade-right">
                    <div ref={nodeRef2}>
                        <Register visible={!isLogin} toggle={toggleForm} onSkipRegistration={skipRegistration} />
                    </div>
                </CSSTransition>
            )}
            <Overlay visible={!isLogin} toggle={toggleForm} />
        </>
    );
}
