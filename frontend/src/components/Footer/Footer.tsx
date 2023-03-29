import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Footer.module.scss';


export default function Footer() {
    const { asPath } = useRouter();

    return (
        <>{asPath !== '/registration' &&
            asPath !== '/authentication/registration' &&
            asPath !== '/authentication/login' &&
            asPath !== '/preferences' &&
            !asPath.includes('/intolerances') &&
            <div className={`w-full ${styles.container}`}>
                <div className={styles.shape}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            style={{ fill: (asPath !== '/') ? 'var(--green-light)' : 'var(--white)' }}></path>
                    </svg>
                </div>
                <div className={`flex pb-10 ${styles.footerContainer}`}
                    style={{ backgroundColor: (asPath !== '/') ? 'var(--green-light)' : 'var(--white)' }}>
                    <div className='flex gap-10 pt-5'>
                        <div>
                            <h4>HELP</h4>
                            <Link href="/">
                                <p>Q&A</p>
                            </Link>
                            <Link href="/">
                                <p>Contact</p>
                            </Link>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <Link href="/">
                                <p>About us</p>
                            </Link>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <Link href="/">
                                <p>Conditions</p>
                            </Link>
                            <Link href="/">
                                <p>Privacy</p>
                            </Link>
                            <Link href="/">
                                <p>Impressum</p>
                            </Link>
                        </div>
                    </div>
                    <div className='right-14 absolute mt-32'>
                        <Link href="/weekOverview">
                            <h3>Tasty</h3>
                            <h3>Plan</h3>
                        </Link>
                    </div>
                </div>
            </div>
        }
        </>

    );
}
