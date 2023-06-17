import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SignUp from '@components/SignUp';
import Modal from '@components/Layout/Modal';

function AuthenticationPage() {
    const router = useRouter();
    const { slug } = router.query;

    const [pageState, setPageState] = useState('login');

    useEffect(() => {
        if (slug === 'login') setPageState('login');
        else if (slug === 'registration') setPageState('registration');
    }, [router, slug]);

    const handleModal = (pageState: string) => {
        if (pageState === 'login') {
            router.push(`${router.basePath}/authentication/login`, undefined, undefined);
            setPageState('login');
        } else if (pageState === 'registration') {
            router.push(`${router.basePath}/authentication/registration`, undefined, undefined);
            setPageState('registration');
        }
    };

    return (
        <>
            <Modal>
                <SignUp setRoute={handleModal} currentForm={pageState} />
            </Modal>
        </>
    );
}

export default AuthenticationPage;
