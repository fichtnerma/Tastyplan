import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
        <div>
            <Image src="/logo.svg" height={200} className="" alt="logo" width={200} priority />
            <div className="flex justify-center items-center ml-50">
                <Modal>
                    <SignUp setRoute={handleModal} currentForm={pageState} />
                </Modal>
            </div>
        </div>
    );
}

export default AuthenticationPage;
