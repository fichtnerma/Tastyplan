import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <>
            <div className={`w-full ${styles.container}`}>
                <div className="h-[10vh]"></div>
                <div className=" ">
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
                        className={`flex pb-10 ${styles.footerContainer} `}
                        style={{ backgroundColor: 'var(--green-light)' }}
                    >
                        <div className="flex flex-col-reverse md:flex-row container relative mx-auto">
                            <div className="flex gap-10 pt-5">
                                <div>
                                    <h4>HELP</h4>
                                    <Link className="p hover:text-green-custom3" href="/company/questions">
                                        Q&A
                                    </Link>
                                </div>
                                <div>
                                    <h4>Company</h4>
                                    <Link className="p hover:text-green-custom3" href="/company/aboutUs">
                                        About us
                                    </Link>
                                </div>
                                <div className="flex flex-col">
                                    <h4>Legal</h4>
                                    <Link className="p hover:text-green-custom3" href="/legal/privacy">
                                        Privacy Policy
                                    </Link>
                                    <Link className="p hover:text-green-custom3" href="/legal/impressum">
                                        Imprint
                                    </Link>
                                </div>
                            </div>
                            <div className="md:absolute right-14  md:mt-16 justify-center flex mb-5 md:mb-0">
                                <Link className="block" href="/weekOverview">
                                    <Image src={'/logo.svg'} alt="Calendar Img" width={150} height={150} priority />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
