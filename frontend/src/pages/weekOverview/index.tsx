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

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
        <>{!loading ? (
            <div className={styles.container}>
                <h3>Your Weekplan</h3>
                <div className='flex flex-row justify-between'>
                    {weekplan?.weekplanEntry?.map((day: any) => (
                        <div key={day.date}>
                            <h4>{week[new Date(day.date).getDay()]}</h4>
                            <Link href={`/recipe/${day.recipe.id}`}>
                                <div className={styles.weekplanBox}>
                                    <div className={styles.foodBox}>
                                        <Image src={testImg} alt="Food Img" className={styles.foodImg} priority />
                                        <div className={styles.discriptionFood}>
                                            <p className='text-xxl truncate overflow-hidden w-56'>{day.recipe.name}</p>
                                            {day.recipe.preparingTime != null &&
                                                <div className='flex flex-row gap-x-2'>
                                                    <Image src={timeIcon} alt="Time Icon" width={20} height={20} priority />
                                                    <p className='text-base'>{day.recipe.preparingTime} min</p>
                                                </div>
                                            }
                                            <div className={styles.discriptionHover}>
                                                {day.recipe.difficulty != null &&
                                                    <div className='flex flex-row gap-x-2'>
                                                        <Image src={kochIcon} alt="Time Icon" width={20} height={20} priority />
                                                        <p className='text-base'>{day.recipe.difficulty}</p>
                                                    </div>
                                                }
                                                {day.recipe.formOfDiet != null &&
                                                    <div className='flex flex-row gap-x-2'>
                                                        <Image src={vegetarianIcon} alt="Time Icon" width={20} height={20} priority />
                                                        <p className='text-base'>{day.recipe.formOfDiet}</p>
                                                    </div>
                                                }
                                                {day.recipe.cookingTime != null &&
                                                    <div className='flex flex-row gap-x-2'>
                                                        <Image src={potIcon} alt="Time Icon" width={20} height={20} priority />
                                                        <p className='text-base'>{
                                                            day.recipe.cookingTime} min</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div >
        )
            : (<div>loading</div>)
        }</>)
}