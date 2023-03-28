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
        <div className="flex justify-center min-h-[600px]">
            {pageState === 'login' ? (
                <>
                    <Login onSubmit={handleLoginSubmit} />
                    <div className="flex flex-col items-center justify-center basis-1/4 px-12 bg-green-custom2">
                        <h2 className="h2-white text-center">Hello, Friend!</h2>
                        <p className="p-white text-sm mb-8">Note registered yet?</p>
                        <button className="btn-secondary block my-0 mx-auto" onClick={handleSignUp}>
                            Sign up
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center basis-1/4 p-12 bg-green-custom2">
                        <h2 className="h2-white text-center">Welcome, Friend</h2>
                        <p className="p-white mb-8">Already have an Account?</p>
                        <button className="btn-secondary" onClick={handleSignIn}>
                            Sign in
                        </button>
                    </div>
                    <Register onSignIn={handleSignIn} />
                </>
            )}
        </div>
    );
}

export default AuthenticationPage;
