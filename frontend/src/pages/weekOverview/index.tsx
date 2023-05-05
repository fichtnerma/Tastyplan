import React from 'react';
import { useSession } from 'next-auth/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import { Mousewheel, Navigation, Scrollbar } from 'swiper';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import Icon from '@components/Icon/Icon';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Role, Weekplan, WeekplanEntry } from 'src/types/types';
import styles from '../../styles/WeekOverview.module.scss';

type DateFormatOptions = {
    year: '2-digit' | 'numeric';
    month: '2-digit' | 'numeric' | 'narrow' | 'short' | 'long';
    day: '2-digit' | 'numeric';
};

const swiperBreakpoints = {
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
};

export default function WeekOverview() {
    const { data: session } = useSession();
    const { data, error } = useFetchWithAuth('/service/weekplan/current');
    const weekplan = data as Weekplan;
    const user = session?.user;
    const options: DateFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

    const today = new Date().getDay();
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <>
            {data && !error ? (
                <div className={`w-full ${styles.container}`}>
                    <h1>{user?.role === Role.user ? user?.userId + "'s" : 'Your'} Weekplan</h1>
                    <div className="flex mt-10">
                        <h2>Lunch</h2>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            scrollbar={{
                                draggable: true,
                            }}
                            loop={false}
                            mousewheel={true}
                            breakpoints={swiperBreakpoints}
                            modules={[Navigation, Scrollbar, Mousewheel]}
                            className={styles.mySwiper}
                        >
                            {weekplan?.weekplanEntry?.map((day: WeekplanEntry) => (
                                <SwiperSlide key={day.date}>
                                    <div className="mr-12">
                                        <div className="mb-5">
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
                                            <h5
                                                style={{
                                                    color:
                                                        today == new Date(day.date).getDay()
                                                            ? 'var(--green-dark)'
                                                            : 'var(--gray-3)',
                                                }}
                                            >
                                                {new Date(day.date).toLocaleDateString('de-DE', options)}
                                            </h5>
                                        </div>
                                        <div
                                            className="flex justify-end w-[260px] h-2"
                                            style={{
                                                color:
                                                    today == new Date(day.date).getDay()
                                                        ? 'var(--green-dark)'
                                                        : 'var(--black)',
                                            }}
                                        >
                                            <Icon size={40} icon="threeDots"></Icon>
                                        </div>
                                        <RecipeCard
                                            recipe={day.recipe}
                                            highlighted={today == new Date(day.date).getDay()}
                                        />
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
