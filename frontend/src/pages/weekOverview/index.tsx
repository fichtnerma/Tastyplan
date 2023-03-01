import styles from '../../styles/WeekOverview.module.scss';
import Image from 'next/image';
import testImg from '../../../public/TestBild.jpg';
import timeIcon from '../../../public/Icons/time.svg';
import Link from 'next/link';

export default function WeekOverview() {
    const week = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    return (
        <div className={styles.container}>
            <div className={styles.weekplanBox}>
                <h3>Meine Woche</h3>
                <div className='flex flex-row justify-between'>
                    {week.map((day) => (
                        <div>
                            <p>{day}</p>
                            <div className={styles.foodBox}>
                                <Link href="/detailRecipe">
                                    <Image src={testImg} alt="Food Img" className={styles.foodImg} priority />
                                    <div className={styles.discriptionFood}>
                                        <p className='text-lg text-ellipsis overflow-hidden w-36'>Name vom Essen super duppper langer name</p>
                                        <div className='flex flex-row gap-x-2'>
                                            <Image src={timeIcon} alt="Time Icon" width={15} height={15} priority />
                                            <p className='text-sm'>20 min</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}