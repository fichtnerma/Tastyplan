'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import { Mousewheel, Navigation, Scrollbar } from 'swiper';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import { fetchWithAuth } from '@helpers/utils';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Role, Weekplan, WeekplanEntry } from 'src/types/types';
import styles from '@styles/WeekOverview.module.scss';

type DateFormatOptions = {
    year: '2-digit' | 'numeric';
    month: '2-digit' | 'numeric' | 'narrow' | 'short' | 'long';
    day: '2-digit' | 'numeric';
};

const swiperBreakpoints = {
    400: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    780: {
        slidesPerView: 4,
        spaceBetween: 10,
    },
    1000: {
        slidesPerView: 5,
        spaceBetween: 10,
    },
    1250: {
        slidesPerView: 6,
        spaceBetween: 10,
    },
    1500: {
        slidesPerView: 7,
        spaceBetween: 10,
    },
};

export default function WeekOverview() {
    const { data: session } = useSession();
    const { data, error, refresh } = useFetchWithAuth('/service/weekplan/current');
    const weekplan = data as Weekplan;
    const user = session?.user;
    const options: DateFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

    const today = new Date().getDay();
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const generateNewWeek = async () => {
        const weekplanRes = await fetchWithAuth(
            '/service/weekplan/create',
            {
                method: 'POST',
            },
            session,
        );

        if (weekplanRes.ok) {
            refresh();
        }
    };

    function showWeekplan(day: WeekplanEntry) {
        return (
            <>
                <div className="sm:mb-5">
                    <h3
                        className="h2 !mb-0 !leading-none"
                        style={{
                            color: today == new Date(day.date).getDay() ? 'var(--green-dark)' : 'var(--black)',
                        }}
                    >
                        {week[new Date(day.date).getDay()]}
                    </h3>
                    <h4
                        className="h5 !mb-0"
                        style={{
                            color: today == new Date(day.date).getDay() ? 'var(--green-dark)' : 'var(--gray-3)',
                        }}
                    >
                        {new Date(day.date).toLocaleDateString('de-DE', options)}
                    </h4>
                </div>
                {/* <div
                    className="flex justify-end w-[260px] h-2"
                    style={{
                        color: today == new Date(day.date).getDay() ? 'var(--green-dark)' : 'var(--black)',
                    }}
                >
                    <Icon size={40} icon="threeDots"></Icon>
                </div> */}
                <RecipeCard recipe={day.recipe} highlighted={today == new Date(day.date).getDay()} />
            </>
        );
    }

    return (
        <>
            {data && !error ? (
                <div className={`w-full p-6 md:p-14 md:pt-24 ${styles.container}`}>
                    <div className="sm:flex sm:justify-between">
                        <h1 className="">{user?.role === Role.user ? user?.userId + "'s" : 'Your'} Weekplan</h1>
                        <div className="mt-4">
                            <button
                                className="btn-primary rounded-full btn-small"
                                data-cy="start-planning-btn"
                                onClick={generateNewWeek}
                            >
                                <span className="text-white-custom">Generate New Plan</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex">
                        {/* Mobile */}
                        <div className="sm:hidden w-full">
                            {weekplan?.weekplanEntry?.map((day: WeekplanEntry) => (
                                <div key={day.date} className="mb-5">
                                    {showWeekplan(day)}
                                </div>
                            ))}
                        </div>
                        {/* Destkop */}
                        <h2 className="h1 hidden sm:block">Lunch</h2>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            scrollbar={{
                                draggable: true,
                            }}
                            loop={false}
                            mousewheel={{
                                forceToAxis: true,
                            }}
                            // breakpoints={swiperBreakpoints}
                            modules={[Navigation, Scrollbar, Mousewheel]}
                            className={styles.mySwiper}
                        >
                            {weekplan?.weekplanEntry?.map((day: WeekplanEntry) => (
                                <SwiperSlide key={day.date}>
                                    <div className="mr-12">{showWeekplan(day)}</div>
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
