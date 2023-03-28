import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";


import { Mousewheel, Navigation, Scrollbar } from "swiper";

import styles from '../../styles/WeekOverview.module.scss';

import testImg from '../../../public/EssenBild.jpg';
import timeIcon from '../../../public/Icons/time.svg';
import kochIcon from '../../../public/Icons/kochmutze.png';
import potIcon from '../../../public/Icons/topf.png';
import vegetarianIcon from '../../../public/Icons/vegetarian.png';

import Image from 'next/image';
import Link from 'next/link';


export default function WeekOverview() {

    const [weekplan, setWeekplan] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const today = new Date().getDay()
    console.log("Heute ist: " + today);


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
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    scrollbar={true}
                    navigation={true}
                    mousewheel={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Navigation, Scrollbar, Mousewheel]} className="mySwiper">
                    {/* <div className={`flex flex-row justify-between ${styles.weekContainer}`}> */}
                    {weekplan?.weekplanEntry?.map((day: any) => (
                        <SwiperSlide>
                            <div key={day.date} className='mr-12'>
                                <h4 style={{ color: (today == new Date(day.date).getDay()) ? 'var(--green-dark)' : 'var(--black)' }}>{week[new Date(day.date).getDay()]}</h4>
                                <Link href={`/recipe/${day.recipe.id}`}>
                                    <div
                                        className={styles.weekplanBox}
                                        style={{ backgroundColor: (today == new Date(day.date).getDay()) ? 'var(--green-dark)' : 'var(--green-light)' }}>
                                        <div className={styles.foodBox}>
                                            <Image src={testImg} alt="Food Img" className={styles.foodImg} priority />
                                            <div className={styles.discriptionFood}>
                                                <p className='text-xxl truncate overflow-hidden w-56'
                                                    style={{ color: (today == new Date(day.date).getDay()) ? 'var(--white)' : 'var(--black)' }}
                                                >{day.recipe.name}</p>
                                                {day.recipe.preparingTime != null &&
                                                    <div className='flex flex-row gap-x-2'>
                                                        <Image src={timeIcon} alt="Time Icon" className='mb-4 mt-4' width={20} height={20} priority />
                                                        <p className='text-base mb-4 mt-4'
                                                            style={{ color: (today == new Date(day.date).getDay()) ? 'var(--white)' : 'var(--black)' }}>{day.recipe.preparingTime} min</p>
                                                    </div>
                                                }
                                                <div className={styles.discriptionHover}>
                                                    {day.recipe.difficulty != null &&
                                                        <div className='flex flex-row gap-x-2'>
                                                            <Image src={kochIcon} alt="Time Icon" className='mb-4' width={20} height={20} priority />
                                                            <p className='text-base mb-4'
                                                                style={{ color: (today == new Date(day.date).getDay()) ? 'var(--white)' : 'var(--black)' }}>{day.recipe.difficulty}</p>
                                                        </div>
                                                    }
                                                    {day.recipe.formOfDiet != null &&
                                                        <div className='flex flex-row gap-x-2'>
                                                            <Image src={vegetarianIcon} alt="Time Icon" className='mb-4' width={20} height={20} priority />
                                                            <p className='text-base mb-4'
                                                                style={{ color: (today == new Date(day.date).getDay()) ? 'var(--white)' : 'var(--black)' }}>{day.recipe.formOfDiet}</p>
                                                        </div>
                                                    }
                                                    {day.recipe.cookingTime != null &&
                                                        <div className='flex flex-row gap-x-2'>
                                                            <Image src={potIcon} alt="Time Icon" className='mb-4' width={20} height={20} priority />
                                                            <p className='text-base mb-4'
                                                                style={{ color: (today == new Date(day.date).getDay()) ? 'var(--white)' : 'var(--black)' }}>{
                                                                    day.recipe.cookingTime} min</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                    {/* </div > */}
                </Swiper>
            </div>
        )
            : (<div>loading</div>)
        }</>)
}