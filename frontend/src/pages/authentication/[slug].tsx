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

    return <div className="container">{pageState === 'login' ? <Login /> : <Register />}</div>;
}

export default AuthenticationPage;
