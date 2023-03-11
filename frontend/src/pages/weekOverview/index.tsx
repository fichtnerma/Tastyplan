import styles from '../../styles/WeekOverview.module.scss';

import testImg from '../../../public/EssenBild.jpg';
import timeIcon from '../../../public/Icons/time.svg';
import kochIcon from '../../../public/Icons/kochmutze.png';
import potIcon from '../../../public/Icons/topf.png';
import vegetarianIcon from '../../../public/Icons/vegetarian.png';

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

export default function WeekOverview() {

    const [weekplan, setWeekplan] = useState<any>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetch(`http://localhost:3000/weekplan/1`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                setWeekplan({ ...data })
                setLoading(false)
            })
    }, [loading])

    const week = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    return (
        <>{!loading ? (
            <div className={styles.container}>
                <div className={styles.weekplanBox}>
                    <h3>Meine Woche</h3>
                    <div className='flex flex-row justify-between'>
                        {weekplan?.weekplanEntry?.map((day: any) => (
                            <div key={day.date}>
                                <p>{week[new Date(day.date).getDay()]}</p>
                                <div className={styles.foodBox}>
                                    <Link href={`/recipe/${day.recipe.id}`}>
                                        <Image src={testImg} alt="Food Img" className={styles.foodImg} priority />
                                        <div className={styles.discriptionFood}>
                                            <p className='text-lg text-ellipsis overflow-hidden w-36'>{day.recipe.name}</p>
                                            {day.recipe.difficulty != null &&
                                                <div className='flex flex-row gap-x-2'>
                                                    <Image src={kochIcon} alt="Time Icon" width={15} height={15} priority />
                                                    <p className='text-sm'>{day.recipe.difficulty}</p>
                                                </div>
                                            }
                                            {day.recipe.formOfDiet != null &&
                                                <div className='flex flex-row gap-x-2'>
                                                    <Image src={vegetarianIcon} alt="Time Icon" width={15} height={15} priority />
                                                    <p className='text-sm'>{day.recipe.formOfDiet}</p>
                                                </div>
                                            }
                                            {day.recipe.preparingTime != null &&
                                                <div className='flex flex-row gap-x-2'>
                                                    <Image src={timeIcon} alt="Time Icon" width={15} height={15} priority />
                                                    <p className='text-sm'>{day.recipe.preparingTime} min</p>
                                                </div>
                                            }
                                            {day.recipe.cookingTime != null &&
                                                <div className='flex flex-row gap-x-2'>
                                                    <Image src={potIcon} alt="Time Icon" width={15} height={15} priority />
                                                    <p className='text-sm'>{
                                                        day.recipe.cookingTime} min</p>
                                                </div>
                                            }
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        )
            : (<div>loading</div>)
        }</>)
}