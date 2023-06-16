import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SignUp from '@components/SignUp';
import Modal from '@components/Layout/Modal';
import { useAppUser } from '@hooks/useAppUser';

function AuthenticationPage() {
    const router = useRouter();
    const { hasFinishedSetup, isLoggedIn } = useAppUser();
    const { slug } = router.query;

    const [pageState, setPageState] = useState('login');

    useEffect(() => {
        // if (hasFinishedSetup) {
        //     router.push(`${router.basePath}/weekOverview`, undefined, undefined);
        // } else if (isLoggedIn) {
        //     router.push(`${router.basePath}/setup`, undefined, undefined);
        // }

        console.log({ hasFinishedSetup, isLoggedIn });

        if (slug === 'login') setPageState('login');
        else if (slug === 'registration') setPageState('registration');
    }, [router, slug, hasFinishedSetup, isLoggedIn]);

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
