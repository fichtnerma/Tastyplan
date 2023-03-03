import React, { useState } from 'react';
import Menu from '@components/Menu/Menu';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import styles from '../Header/Header.module.scss';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <div className={styles.container}>
                <Link href="/weekOverview">
                    <Image src={logo} alt="Logo" width={200} height={155} priority />
                </Link>

                <div className="col-span-2">
                    <h1>Hi, Jo!</h1>
                    <h2 className={styles.secondTitle}>Willkommen bei Tasty Plan</h2>
                </div>
                <div>
                    <button
                        className={menuOpen ? `${styles.navIcon} ${styles.open}` : styles.navIcon}
                        onClick={() => toggleMenu()}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div>
                    <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
                </div>
            )}
        </>
    );
}
