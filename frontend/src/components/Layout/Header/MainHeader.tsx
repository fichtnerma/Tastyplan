'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import styles from './MainHeader.module.scss';

export default function MainHeader() {
    const { data: session } = useSession();
    const [scrollPos, setScrollPos] = useState(0);
    const [headerClass, setHeaderClass] = useState('');
    const [userIsGuest, setUserIsGuest] = useState(true);

    useEffect(() => {
        function handleScroll() {
            setScrollPos(document.body.getBoundingClientRect().top);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPos < 0) {
            setHeaderClass(styles.scroll);
        } else {
            setHeaderClass('');
        }

        if (session?.user.role === 'guest') setUserIsGuest(true);
        else setUserIsGuest(false);
    }, [scrollPos, session, userIsGuest]);

    if (typeof window !== 'undefined') {
        changeActiveTab();
    }

    return (
        <>
            <div className={`${styles.headerContainer}`}>
                <div className={`${styles.container} ${headerClass}`}>
                    <Link href="/weekOverview" className="hidden md:block my-auto">
                        <div className="ml-6">
                            <Image src={'/logo.svg'} alt="Calendar Img" width={70} height={70} priority />
                        </div>
                    </Link>

                    <div className="flex gap-14 md:gap-10 md:mr-8 m-auto mt-3">
                        <Link
                            href="/weekOverview"
                            onClick={changeActiveTab}
                            className={`link weekOverview ${styles.active}`}
                        >
                            <div className={`flex gap-2 items-center ${styles.weekplan}`}>
                                <Icon size={25} icon="calender"></Icon>
                                <p className="hidden md:block">Weekplan</p>
                            </div>
                            <div
                                className={`bg-green-custom2 rounded-full h-1 w-full mt-2 line hidden md:block ${styles.lineHide} ${styles.lineShow}`}
                            ></div>
                        </Link>
                        <Link href="/shoppingList" onClick={changeActiveTab} className={`link shoppingList`}>
                            <div className={`flex gap-2 items-center ${styles.shoppingList}`}>
                                <Icon size={25} icon="shoppinglist"></Icon>
                                <p className="hidden md:block">Shopping List</p>
                            </div>
                            <div
                                className={`bg-green-custom2 rounded-full h-1 w-full mt-2 line hidden md:block ${styles.lineHide}`}
                            ></div>
                        </Link>
                        <Link href="/cookbook" onClick={changeActiveTab} className={`link cookbook`}>
                            <div className={`flex gap-2 items-center fill-none ${styles.cookbook}`}>
                                <Icon size={25} icon="heart"></Icon>
                                <p className="hidden md:block">Cookbook</p>
                            </div>
                            <div
                                className={`bg-green-custom2 rounded-full h-1 w-full mt-2 line hidden md:block ${styles.lineHide}`}
                            ></div>
                        </Link>
                        <div className={styles.userIcon}>
                            <div className="block md:hidden">
                                <Link href="/settings" className="">
                                    <div className="flex gap-2 items-center hover:cursor-pointer">
                                        <Icon size={25} icon="user"></Icon>
                                    </div>
                                </Link>
                            </div>
                            <div className="hidden md:flex gap-2 items-center ">
                                <Icon size={25} icon="user"></Icon>
                            </div>
                            <div className={`w-40 pt-8 right-14 absolute hidden md:block ${styles.dropdown} `}>
                                <div className={`rounded-2xl bg-green-custom1 ${headerClass}`}>
                                    {userIsGuest ? (
                                        <Link href="authentication/registration">
                                            <div
                                                className={`flex justify-center gap-2 text-right py-5 settings dropdown ${styles.guestUserDropdown}`}
                                            >
                                                <p>Registration</p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link href="/settings">
                                            <div
                                                className={`flex gap-2 text-right pt-5 pb-3 pl-5 settings dropdown ${styles.settingsDropdown}`}
                                            >
                                                <p>Settings</p>
                                                <div className="right-0 absolute pr-8">
                                                    <Icon size={25} icon="settings"></Icon>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                    {!userIsGuest && (
                                        <Link onClick={async () => await signOut()} href="/" className="">
                                            <div
                                                className={`flex gap-2 items-center pb-5 pl-5 pt-3 user dropdown ${styles.userDropdown}`}
                                            >
                                                <p>Log out</p>
                                                <div className="right-0 absolute pr-8">
                                                    <Icon size={25} icon="user"></Icon>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function changeActiveTab() {
    const activeClass = `${styles.active}`;
    const settingsClass = `${styles.settingsActive}`;
    const lineShowClass = `${styles.lineShow}`;

    document.querySelectorAll('.link').forEach((el) => {
        el.classList.remove(activeClass);
    });

    document.querySelectorAll('.dropdown').forEach((el) => {
        el.classList.remove(settingsClass);
    });

    document.querySelectorAll('.line').forEach((el) => {
        el.classList.remove(lineShowClass);
    });

    const activeElement = getElement(activeClass, settingsClass);

    const line = activeElement?.querySelector('.line');
    line?.classList.add(lineShowClass);
}

function getElement(activeClass: string, settingsClass: string) {
    const currentPath = window.location.pathname;
    if (currentPath === '/weekOverview') {
        const element = document.querySelector('.weekOverview');
        element?.classList.add(activeClass);
        return element;
    } else if (currentPath === '/shoppingList') {
        const element = document.querySelector('.shoppingList');
        element?.classList.add(activeClass);
        return element;
    } else if (currentPath === '/cookbook') {
        const element = document.querySelector('.cookbook');
        element?.classList.add(activeClass);
        return element;
    } else if (currentPath === '/settings') {
        const element = document.querySelector('.settings');
        element?.classList.add(settingsClass);
        return null;
    } else {
        return null;
    }
}
