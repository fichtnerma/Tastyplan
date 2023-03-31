import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

import { Mousewheel, Navigation, Scrollbar } from 'swiper';

import styles from '../../styles/WeekOverview.module.scss';

import testImg from '../../../public/Icons/carbonara.png';
import timeIcon from '../../../public/Icons/time.svg';
import kochIcon from '../../../public/Icons/kochmutze.png';
import potIcon from '../../../public/Icons/topf.png';
import veganIcon from '../../../public/Icons/vegetarian.png';
import omnivorIcon from '../../../public/Icons/Steak_V2_Icon.svg';
import pescetarianIcon from '../../../public/Icons/Fisch_Icon-11.svg';
import vegetarianIcon from '../../../public/Icons/Soja_Icon.svg';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function WeekOverview() {
    const [weekplan, setWeekplan] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const { data: session, status } = useSession();

    const today = new Date().getDay();
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetch(`http://localhost:3000/weekplan/1`, {
            headers: {
                user: session?.user.userId ? session.user.userId : '',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                const tempData = { ...data, weekplanEntry: data.weekplanEntry.slice(0, 7) };
                console.log(tempData);
                setWeekplan({ ...tempData });
                setLoading(false);
            });
    }, [loading]);

    function getFormOfDietIcon(recipe: { formOfDiet: string }) {
        if (recipe.formOfDiet == 'Vegetarisch') {
            return vegetarianIcon;
        } else if (recipe.formOfDiet == 'Vegan') {
            return veganIcon;
        } else if (recipe.formOfDiet == 'Pescetarian') {
            return pescetarianIcon;
        } else {
            return omnivorIcon;
        }
    }

    return (
        <>
            {!loading ? (
                <div className={styles.container}>
                    <h3>Tabea's Weekplan</h3>
                    <div className="flex mt-10">
                        <h2>Lunch</h2>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            scrollbar={{
                                draggable: true,
                            }}
                            loop={false}
                            // navigation={true}
                            mousewheel={true}
                            breakpoints={{
                                500: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                750: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1000: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1250: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                1500: {
                                    slidesPerView: 5,
                                    spaceBetween: 40,
                                },
                                1750: {
                                    slidesPerView: 6,
                                    spaceBetween: 50,
                                },
                                2000: {
                                    slidesPerView: 7,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[Navigation, Scrollbar, Mousewheel]}
                            className={styles.mySwiper}
                        >
                            {weekplan?.weekplanEntry?.map((day: any) => (
                                <SwiperSlide>
                                    <div className="mr-12">
                                        <h4
                                            style={{
                                                color:
                                                    today == new Date(day.date).getDay()
                                                        ? 'var(--green-dark)'
                                                        : 'var(--black)',
                                            }}
                                        >
                                            {week[new Date(day.date).getDay()]}
                                        </h4>
                                        <Link href={`/recipe/${day.recipe.id}`}>
                                            <div className={styles.wrapperContainer}>
                                                <div className={styles.foodBox}>
                                                    <img
                                                        src={`http://localhost:3000/images/${
                                                            day.recipe.img || 'erbsensuppe.png'
                                                        }`}
                                                        alt="Food Img"
                                                        className={styles.foodImg}
                                                        priority
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        today === new Date(day.date).getDay()
                                                            ? `${styles.weekplanBox} ${styles.weekplanBoxToday}`
                                                            : styles.weekplanBox
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            day.recipe.name.length >= 20
                                                                ? `${styles.discriptionFood} ${styles.twoLinesName}`
                                                                : styles.discriptionFood
                                                        }
                                                    >
                                                        <div className="h-16 absolute bottom-0">
                                                            <p
                                                                className="text-2xl w-56 absolute bottom-0"
                                                                style={{
                                                                    color:
                                                                        today === new Date(day.date).getDay()
                                                                            ? 'var(--white)'
                                                                            : 'var(--black)',
                                                                }}
                                                            >
                                                                {day.recipe.name}
                                                            </p>
                                                        </div>
                                                        <div className={styles.discriptionHover}>
                                                            {day.recipe.preparingTime !== null && (
                                                                <div className="flex flex-row gap-x-2">
                                                                    <Image
                                                                        src={timeIcon}
                                                                        alt="Time Icon"
                                                                        className="mb-4 mt-4"
                                                                        width={20}
                                                                        height={20}
                                                                        priority
                                                                    />
                                                                    <p
                                                                        className="text-base mb-4 mt-4"
                                                                        style={{
                                                                            color:
                                                                                today == new Date(day.date).getDay()
                                                                                    ? 'var(--white)'
                                                                                    : 'var(--black)',
                                                                        }}
                                                                    >
                                                                        {day.recipe.preparingTime} min
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {day.recipe.difficulty !== null && (
                                                                <div className="flex flex-row gap-x-2">
                                                                    <Image
                                                                        src={kochIcon}
                                                                        alt="Time Icon"
                                                                        className="mb-4"
                                                                        width={20}
                                                                        height={20}
                                                                        priority
                                                                    />
                                                                    <p
                                                                        className="text-base mb-4"
                                                                        style={{
                                                                            color:
                                                                                today == new Date(day.date).getDay()
                                                                                    ? 'var(--white)'
                                                                                    : 'var(--black)',
                                                                        }}
                                                                    >
                                                                        {day.recipe.difficulty}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {day.recipe.formOfDiet !== null && (
                                                                <div className="flex flex-row gap-x-2">
                                                                    <Image
                                                                        src={getFormOfDietIcon(day.recipe)}
                                                                        alt="Time Icon"
                                                                        className="mb-4"
                                                                        width={20}
                                                                        height={20}
                                                                        priority
                                                                    />
                                                                    <p
                                                                        className="text-base mb-4"
                                                                        style={{
                                                                            color:
                                                                                today === new Date(day.date).getDay()
                                                                                    ? 'var(--white)'
                                                                                    : 'var(--black)',
                                                                        }}
                                                                    >
                                                                        {day.recipe.formOfDiet}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {day.recipe.cookingTime !== null && (
                                                                <div className="flex flex-row gap-x-2">
                                                                    <Image
                                                                        src={potIcon}
                                                                        alt="Time Icon"
                                                                        className="mb-4"
                                                                        width={20}
                                                                        height={20}
                                                                        priority
                                                                    />
                                                                    <p
                                                                        className="text-base mb-4"
                                                                        style={{
                                                                            color:
                                                                                today === new Date(day.date).getDay()
                                                                                    ? 'var(--white)'
                                                                                    : 'var(--black)',
                                                                        }}
                                                                    >
                                                                        {day.recipe.cookingTime} min
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
}
