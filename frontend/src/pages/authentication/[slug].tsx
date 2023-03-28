import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Login from '@components/Login/Login';
import Register from '@components/Register/Register';

function AuthenticationPage() {
    const router = useRouter();
    const { slug } = router.query;

    const [pageState, setPageState] = useState('login');

    useEffect(() => {
        if (slug === 'login') setPageState('login');
        else if (slug === 'registration') setPageState('registration');
    }, [router]);

    // useEffect(() => {
    //     router.push(`${router.basePath}/authentication/${pageState}`, undefined, undefined);
    // }, [pageState]);

    const handleLoginSubmit = () => {
        console.log('login button clicked');
    };

    const handleSignUp = () => {
        router.push(`${router.basePath}/authentication/registration`, undefined, undefined);
        setPageState('registration');
    };

    const handleSignIn = () => {
        router.push(`${router.basePath}/authentication/login`, undefined, undefined);
        setPageState('login');
    };

    return (
        <div className="flex justify-center">
            {pageState === 'login' ? (
                <>
                    <Login onSubmit={handleLoginSubmit} />{' '}
                    <div className="flex flex-col items-center justify-center bg-green-custom2 px-12">
                        <h2 className="h2-white">Hello, Friend!</h2>
                        <p className="p-white text-sm mb-8">
                            Enter your personal details and start your journey with us
                        </p>
                        <button className="btn-secondary block my-0 mx-auto" onClick={handleSignUp}>
                            Sign up
                        </button>
                    </div>{' '}
                </>
            ) : (
                <Register onSignIn={handleSignIn} />
            )}
        </div>
    );
}

export default AuthenticationPage;
