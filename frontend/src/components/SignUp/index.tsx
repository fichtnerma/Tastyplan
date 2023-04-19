import Icon from '@components/Icon/Icon';
import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Login from './Login/Login';
import Overlay from './Overlay/Overlay';
import Register from './Register/Register';

interface SignUpProps {
    currentForm: string;
    setRoute: (route: string) => void;
}

export default function SignUp({ currentForm, setRoute }: SignUpProps) {
    const isLogin = currentForm === 'login' ? true : false;
    const isRegistration = currentForm === 'registration' ? true : false;
    const nodeRef = React.useRef(null);
    const nodeRef2 = React.useRef(null);
    const toggleForm = (activeForm: string) => {
        console.log(activeForm);
        // setIsLogin(!isLogin);
        setRoute(activeForm);
    };

    const skipRegistration = (evt: MouseEvent) => {
        evt.preventDefault();
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
                className={`absolute cursor-pointer z-50 top-3 transition-all ease-in-out duration-700 right-4 ${
                    isLogin ? 'text-white-custom' : 'text-black'
                }`}
            >
                <a href="#">
                    <Icon size={20} icon="close" />
                </a>
            </div>
            {isLogin ? (
                <CSSTransition
                    in={isLogin}
                    timeout={600}
                    nodeRef={nodeRef}
                    classNames="fade-left"
                >
                    <div ref={nodeRef}>
                        <Login visible={isLogin} />
                    </div>
                </CSSTransition>
            ) : (
                <CSSTransition
                    in={isLogin}
                    timeout={600}
                    nodeRef={nodeRef2}
                    classNames="fade-right"
                >
                    <div ref={nodeRef2}>
                        <Register visible={!isLogin} toggle={toggleForm} />
                    </div>
                </CSSTransition>
            )}
            <Overlay visible={!isLogin} toggle={toggleForm} />
        </>
    );
}
