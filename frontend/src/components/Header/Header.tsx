import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/Icon/Icon';
import styles from '../Header/Header.module.scss';

export default function Header() {
    const [scrollPos, setScrollPos] = useState(0);
    const [headerClass, setHeaderClass] = useState('');

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
    }, [scrollPos]);

    if (typeof window !== 'undefined') {
        changeActiveTab();
    }

    return (
        <>
            <div className={`${styles.headerContainer}`}>
                <div className={`${styles.container} ${headerClass}`}>
                    <Link href="/weekOverview">
                        <div className="ml-6 mt-3">
                            <Image src={'/logo.svg'} alt="Calendar Img" width={90} height={90} priority />
                        </div>
                    </Link>

                    <div className="flex gap-10 mr-8 mt-6">
                        <Link href="/weekOverview" onClick={changeActiveTab} className={`link weekOverview`}>
                            <div className={`flex gap-2 items-center ${styles.weekplan}`}>
                                <Icon size={25} icon="calender"></Icon>
                                <p>Weekplan</p>
                            </div>
                        </Link>
                        <Link href="/shoppingList" onClick={changeActiveTab} className={`link shoppingList`}>
                            <div className={`flex gap-2 items-center ${styles.shoppingList}`}>
                                <Icon size={25} icon="shoppinglist"></Icon>
                                <p>Shopping List</p>
                            </div>
                        </Link>
                        <Link href="/cookbook" onClick={changeActiveTab} className={`link cookbook`}>
                            <div className={`flex gap-2 items-center fill-none ${styles.cookbook}`}>
                                <Icon size={25} icon="heart"></Icon>
                                <p>Cookbook</p>
                            </div>
                        </Link>
                        <div className={styles.userIcon}>
                            <div className="flex gap-2 items-center">
                                <Icon size={25} icon="user"></Icon>
                            </div>
                            <div className={`w-40 pt-8 right-14 absolute ${styles.dropdown}`}>
                                <div className="rounded-2xl bg-green-custom1 ">
                                    <Link href="/settings" className="">
                                        <div
                                            className={`flex gap-2 text-right pt-5 pb-3 pl-5 settings dropdown${styles.settingsDropdown}`}
                                        >
                                            <p>Settings</p>
                                            <div className="right-0 absolute pr-8">
                                                <Icon size={25} icon="settings"></Icon>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/" className="">
                                        <div
                                            className={`flex gap-2 items-center pb-5 pl-5 pt-3 user dropdown${styles.userDropdown}`}
                                        >
                                            <p>Log out</p>
                                            <div className="right-0 absolute pr-8">
                                                <Icon size={25} icon="user"></Icon>
                                            </div>
                                        </div>
                                    </Link>
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
    const currentPath = window.location.pathname;
    const activeClass = `${styles.active}`;
    const settingsClass = `${styles.settingsActive}`;
    // const userClass = `${styles.userActive}`;

    document.querySelectorAll('.link').forEach((el) => {
        el.classList.remove(activeClass);
    });

    document.querySelectorAll('.dropdown').forEach((el) => {
        el.classList.remove(settingsClass);
        // el.classList.remove(userClass);
    });

    if (currentPath === '/weekOverview') {
        const element = document.querySelector('.weekOverview');
        element?.classList.add(activeClass);
    } else if (currentPath === '/shoppingList') {
        const element = document.querySelector('.shoppingList');
        element?.classList.add(activeClass);
    } else if (currentPath === '/cookbook') {
        const element = document.querySelector('.cookbook');
        element?.classList.add(activeClass);
    } else if (currentPath === '/settings') {
        const element = document.querySelector('.settings');
        element?.classList.add(settingsClass);
    }
    // else if (currentPath === '/') {
    //     const element = document.querySelector('.user');
    //     element?.classList.add(userClass);
    // }
    else {
        console.log('Header: No Path found');
    }
}

// const [menuOpen, setMenuOpen] = useState(false);
// const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
// };

{
    /* <div>
    <button
        className={menuOpen ? `${styles.navIcon} ${styles.open}` : styles.navIcon}
        onClick={() => toggleMenu()}
    >
        <span></span>
        <span></span>
        <span></span>
    </button>
</div> */
}

{
    /* {menuOpen && (
    <div>
        <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
)} */
}
