'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUp from '@components/SignUp';
import Modal from '@components/Layout/Modal';

function AuthenticationPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const [slug, setSlug] = useState('login');
    const [pageState, setPageState] = useState('login');

    useEffect(() => {
        params.then(({ slug }) => setSlug(slug));
    }, [params]);

    useEffect(() => {
        if (slug === 'login') setPageState('login');
        else if (slug === 'registration') setPageState('registration');
    }, [router, slug]);

    const handleModal = (pageState: string) => {
        if (pageState === 'login') {
            router.push(`/authentication/login`, undefined);
        } else if (pageState === 'registration') {
            router.push(`/authentication/registration`, undefined);
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
