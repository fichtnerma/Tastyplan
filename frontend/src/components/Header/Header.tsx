import React, { useState } from 'react';
import Menu from '@components/Menu/Menu';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Header/Header.module.scss';
import calendar from '../../../public/Icons/Header/calendar.png'
import list from '../../../public/Icons/Header/list.png'
import setting from '../../../public/Icons/Header/setting.png'
import user from '../../../public/Icons/Header/user.png'

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link href="/weekOverview">
                    <div className='ml-8 mt-6'>
                        <h4>Tasty</h4>
                        <h4>Plan</h4>
                    </div>
                </Link>

                <div className="flex gap-10 mr-8 mt-5 ">
                    <Link href="/weekOverview" className=''>
                        <div className='flex gap-4'>
                            <Image src={calendar} alt="Calendar Img" width={25} height={25} priority />
                            <p>Weekplan</p>
                        </div>
                    </Link>
                    <Link href="/weekOverview" className=''>
                        <div className='flex gap-4'>
                            <Image src={list} alt="Calendar Img" width={25} height={25} priority />
                            <p>Shopping List</p>
                        </div>
                    </Link>
                    <Link href="/weekOverview" className=''>
                        <div className='flex gap-4'>
                            <Image src={setting} alt="Calendar Img" width={30} height={25} priority />
                            <p>Settings</p>
                        </div>
                    </Link>
                    <Link href="/weekOverview" className=''>
                        <div className='flex gap-4'>
                            <Image src={user} alt="Calendar Img" width={25} height={25} priority />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}




// const [menuOpen, setMenuOpen] = useState(false);
// const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
// };

{/* <div>
    <button
        className={menuOpen ? `${styles.navIcon} ${styles.open}` : styles.navIcon}
        onClick={() => toggleMenu()}
    >
        <span></span>
        <span></span>
        <span></span>
    </button>
</div> */}

{/* {menuOpen && (
    <div>
        <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
)} */}