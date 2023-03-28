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
    }, []);

    const handleLoginSubmit = () => {
        console.log('login button clicked');
    };

    return (
        <div className="flex justify-center">
            {pageState === 'login' ? <Login onSubmit={handleLoginSubmit} /> : <Register />}
            <div className="bg-green-custom2 p-5">
                <h2 className="h2-white">Hello, Friend!</h2>
                <p className="p-white text-sm mb-8">Enter your personal details and start your journey with us</p>
                <button className="btn-secondary block my-0 mx-auto">Sign up</button>
            </div>
        </div>
    );
}

export default AuthenticationPage;
