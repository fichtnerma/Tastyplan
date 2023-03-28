import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@styles/Authentication.module.scss';

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
        <div className={styles.authenticationWrapper}>
            {pageState === 'login' ? (
                <>
                    <Login onSubmit={handleLoginSubmit} />
                    {styles.logo}
                    <div className={styles.authenticationGreetingWrapper}>
                        <h2 className="h2-white text-center">Hello, Friend!</h2>
                        <p className="p-white text-sm mb-8">
                            Enter your personal details and start your journey with us
                        </p>
                        <button className="btn-secondary block my-0 mx-auto" onClick={handleSignUp}>
                            Sign up
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Register onSignIn={handleSignIn} />
                    <div className={styles.authenticationGreetingWrapper}>
                        <h2 className="h2-white text-center">Welcome to Tastyplan</h2>
                        <p className="p-white mb-8">Already have an Account?</p>
                        <button className="btn-secondary" onClick={handleSignIn}>
                            Sign in
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AuthenticationPage;
