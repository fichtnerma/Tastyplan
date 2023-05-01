import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Header/Header.module.scss';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link href="/weekOverview">
                    <div className="ml-6 mt-3">
                        <Image src={'/logo.svg'} alt="Calendar Img" width={90} height={90} priority />
                    </div>
                </Link>

                <div className="flex gap-10 mr-8 mt-6">
                    <Link href="/weekOverview" className="">
                        <div className="flex gap-2 items-center">
                            <Image
                                src={'/Icons/Header/calendar.png'}
                                alt="Calendar Img"
                                width={15}
                                height={15}
                                priority
                            />
                            <p>Weekplan</p>
                        </div>
                    </Link>
                    <Link href="/weekOverview" className="">
                        <div className="flex gap-2 items-center">
                            <Image src={'/Icons/Header/list.png'} alt="List Img" width={15} height={15} priority />
                            <p>Shopping List</p>
                        </div>
                    </Link>
                    <Link href="/weekOverview" className="">
                        <div className="flex gap-2 items-center">
                            <Image
                                src={'/Icons/Header/setting.png'}
                                alt="Setting Img"
                                width={15}
                                height={15}
                                priority
                            />
                            <p>Settings</p>
                        </div>
                    </Link>
                    <Link href="/weekOverview" className="mt-1">
                        <div className="flex gap-2 items-center">
                            <Image src={'/Icons/Header/user.png'} alt="User Img" width={15} height={15} priority />
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
