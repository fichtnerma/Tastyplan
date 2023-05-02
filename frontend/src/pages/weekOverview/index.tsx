import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import { Mousewheel, Navigation, Scrollbar } from 'swiper';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import { useFetchWithAuth } from '@hooks/useFetchWithAuth';
import { Weekplan, WeekplanEntry } from 'src/types/types';
import styles from '../../styles/WeekOverview.module.scss';

export default function WeekOverview() {
    const [loading, data] = useFetchWithAuth(`/service/weekplan/current`, {
        method: 'GET',
    });
    const weekplan = data as Weekplan;

    const today = new Date().getDay();
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <>
            {!loading ? (
                <div className={styles.container}>
                    <h3>Your Weekplan</h3>
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
                            {weekplan?.weekplanEntry?.map((day: WeekplanEntry) => (
                                <SwiperSlide key={day.date}>
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
