import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Login from '@components/Login/Login';
import Register from '@components/Register/Register';

import logo from '../../../public/logo.svg';

function AuthenticationPage() {
    const router = useRouter();
    const { slug } = router.query;

    const [pageState, setPageState] = useState('login');

    useEffect(() => {
        if (slug === 'login') setPageState('login');
        else if (slug === 'registration') setPageState('registration');
    }, [router]);

    const handleSignUp = () => {
        router.push(`${router.basePath}/authentication/registration`, undefined, undefined);
        setPageState('registration');
    };

    const handleSignIn = () => {
        router.push(`${router.basePath}/authentication/login`, undefined, undefined);
        setPageState('login');
    };

    return (
        <div>
            <Image src={logo} className="ml-24 mb-8" alt="logo" width={200} priority />
            <div className="flex justify-center items-center ml-50">
                <div className="flex justify-around py-8 px-12 h-70v w-2/3 bg-white-custom rounded-[20px]">
                    {pageState === 'login' ? (
                        <>
                            <Login />
                            <div className="flex flex-col items-center justify-center basis-1/3 px-12 bg-green-custom2 rounded-[20px]">
                                <h2 className="h2-white text-center">Hello, Friend!</h2>
                                <p className="p-white text-sm mb-8">Note registered yet?</p>
                                <button className="btn-secondary block my-0 mx-auto" onClick={handleSignUp}>
                                    Sign up
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col items-center justify-center basis-1/4 p-12 bg-green-custom2 rounded-[20px]">
                                <h2 className="h2-white text-center">Welcome, Friend</h2>
                                <p className="p-white mb-8">Already have an Account?</p>
                                <button className="btn-secondary" onClick={handleSignIn}>
                                    Sign in
                                </button>
                            </div>
                            <Register />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthenticationPage;
