import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
    const { asPath } = useRouter();

    return (
        <>
            {asPath !== '/registration' &&
                asPath !== '/authentication/registration' &&
                asPath !== '/authentication/login' &&
                asPath !== '/preferences' &&
                !asPath.includes('/intolerances') &&
                !asPath.includes('/setup') && (
                    <div className={`w-full ${styles.container}`}>
                        <div className={styles.shape}>
                            <svg
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                    style={{ fill: 'var(--green-light)' }}
                                ></path>
                            </svg>
                        </div>
                        <div
                            className={`flex pb-10 ${styles.footerContainer}`}
                            style={{ backgroundColor: 'var(--green-light)' }}
                        >
                            <div className="flex gap-10 pt-5">
                                <div>
                                    <h4>HELP</h4>
                                    <Link href="/help/questions">
                                        <p>Q&A</p>
                                    </Link>
                                    {/* <Link href="/help/contact">
                                        <p>Contact</p>
                                    </Link> */}
                                </div>
                                <div>
                                    <h4>Company</h4>
                                    <Link href="/company/aboutUs">
                                        <p>About us</p>
                                    </Link>
                                </div>
                                <div>
                                    <h4>Legal</h4>
                                    {/* <Link href="/legal/conditions">
                                        <p>Conditions</p>
                                    </Link> */}
                                    <Link href="/legal/privacy">
                                        <p>Privacy Policy</p>
                                    </Link>
                                    <Link href="/legal/impressum">
                                        <p>Imprint</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="right-14 absolute mt-16">
                                <Link href="/weekOverview">
                                    <Image src={'/logo.svg'} alt="Calendar Img" width={150} height={150} priority />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}
