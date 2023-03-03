import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../Menu/Menu.module.scss';
type MenuProps = {
    menuOpen: boolean;
    toggleMenu: () => void;
};
export default function Menu({ menuOpen, toggleMenu }: MenuProps) {
    return (
        <>
            <div className={styles.background}>
                <div className={styles.greenShadow}>
                    <div className={styles.text}>
                        <Link href="/weekOverview" onClick={toggleMenu}>
                            <h2 className={styles.heading}>Home</h2>
                        </Link>
                        <Link href="/weekOverview" onClick={toggleMenu}>
                            <h2 className={styles.heading}>Tasty Plan App</h2>
                        </Link>
                        <Link href="/weekOverview" onClick={toggleMenu}>
                            <h2 className={styles.heading}>Contact</h2>
                        </Link>
                        <Link href="/weekOverview" onClick={toggleMenu}>
                            <h2 className={styles.heading}>Q&A</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
