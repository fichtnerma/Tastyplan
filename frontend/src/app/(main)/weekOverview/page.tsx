'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import Icon from '@components/Icon/Icon';
import { fetchWithAuth } from '@helpers/utils';
import { useWeekplan } from '@hooks/useWeekplan';
import { Role, WeekplanEntry } from 'src/types/types';
import styles from '@styles/WeekOverview.module.scss';
import Weekplan from './Weekplan';
import 'swiper/css';
import 'swiper/css/pagination';

export default function WeekOverview() {
    const { data: session } = useSession();
    const { weekplan, updateWeekplan } = useWeekplan();
    const user = session?.user;
    const isInFuture = new Date(weekplan?.startDate || 0) > new Date();

    const generateNewWeek = async (shouldReplace = false) => {
        if (!weekplan) return;
        const weekplanRes = await fetchWithAuth(
            '/service/weekplan/createForDate',
            {
                method: 'POST',
                body: JSON.stringify({
                    date: weekplan?.startDate || new Date(),
                    shouldReplace: shouldReplace,
                }),
            },
            session,
        );

        if (weekplanRes.ok) {
            updateWeekplan(new Date(weekplan?.startDate));
        }
    };

    const showNextWeek = () => {
        if (!weekplan) return;

        const startOfNextPlan = new Date(weekplan.endDate);
        startOfNextPlan.setDate(startOfNextPlan.getDate() + 1);

        updateWeekplan(startOfNextPlan);
    };
    const showPreviousWeek = () => {
        if (!weekplan) return;

        const startOfPrevPlan = new Date(weekplan.startDate);
        startOfPrevPlan.setDate(startOfPrevPlan.getDate() - 7);

        updateWeekplan(startOfPrevPlan);
    };

    return (
        <>
            {weekplan ? (
                <div className={`mainContainer ${styles.container}`}>
                    <div className="flex justify-between">
                        <h1 className="mb-0">{user?.role === Role.user ? user?.userId + "'s" : 'Your'} Weekplan</h1>
                        <div className="sm:mt-4">
                            <button
                                className="btn-primary rounded-full btn-small"
                                onClick={() => generateNewWeek(true)}
                                disabled={weekplan.weekplanEntry == null}
                            >
                                <span className="text-white-custom">Generate new Plan</span>
                            </button>
                        </div>
                    </div>
                    <div className="text-2xl md:text-2xl font-extrabold mb-4 text-gray-custom6">
                        <button
                            onClick={showPreviousWeek}
                            disabled={!weekplan.weekplanEntry && !isInFuture}
                            aria-label="previous week arrow"
                        >
                            <Icon icon="chevronLeft" size={15} />
                        </button>
                        {new Date(weekplan?.startDate).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                        })}{' '}
                        -{' '}
                        {new Date(weekplan?.endDate).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                        })}
                        <button
                            onClick={showNextWeek}
                            disabled={!weekplan.weekplanEntry && isInFuture}
                            aria-label="next week arrow"
                        >
                            <Icon icon="chevronRight" size={15} />
                        </button>
                    </div>
                    <div className="block">
                        {!weekplan.weekplanEntry && isInFuture && (
                            <div>
                                There was no weekplan found for this week. Please generate a new one.
                                <button
                                    className="btn-primary rounded-full btn-small"
                                    onClick={() => generateNewWeek()}
                                >
                                    <span className="text-white-custom justify-center flex leading-none">
                                        Generate
                                        <Icon classNames="inline ml-2" icon="magic" size={15} />
                                    </span>
                                </button>
                            </div>
                        )}
                        {/* Mobile */}
                        {weekplan.hasLunch && (
                            <div className="sm:hidden w-full">
                                {weekplan?.weekplanEntry?.map((day: WeekplanEntry) => (
                                    <div key={day.id} className="mb-5">
                                        <Weekplan
                                            updateWeekplan={updateWeekplan}
                                            day={day}
                                            hasLunch={weekplan.hasLunch}
                                            hasDinner={weekplan.hasDinner}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Desktop */}

                        <div className="w-full mb-8">
                            {/* Lunch */}
                            <div className="flex mb-10">
                                <div className="grid grid-cols-1 grid-rows-2">
                                    {weekplan.hasLunch && (
                                        <h2 className="h1 !text-green-custom2 !font-extrabold hidden sm:block">
                                            Lunch
                                        </h2>
                                    )}
                                    {weekplan.hasDinner && (
                                        <h2 className="h1 !text-green-custom2 !font-extrabold hidden sm:block">
                                            Dinner
                                        </h2>
                                    )}
                                </div>
                                <div className="hidden items-center sm:flex overflow-y-hidden pb-8 scrollable-element">
                                    <Swiper
                                        slidesPerView={2}
                                        spaceBetween={20}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 3,
                                                spaceBetween: 20,
                                            },
                                            968: {
                                                slidesPerView: 4,
                                                spaceBetween: 30,
                                            },
                                            1280: {
                                                slidesPerView: 5,
                                                spaceBetween: 30,
                                            },
                                            1536: {
                                                slidesPerView: 6,
                                                spaceBetween: 30,
                                            },
                                        }}
                                        modules={[Pagination]}
                                        pagination={{ clickable: true }}
                                        className="mySwiper !pb-9"
                                    >
                                        {weekplan?.weekplanEntry?.map((day: WeekplanEntry) => (
                                            <SwiperSlide className="mr-6 mb-2 " key={day.id}>
                                                <Weekplan
                                                    updateWeekplan={updateWeekplan}
                                                    day={day}
                                                    hasLunch={weekplan.hasLunch}
                                                    hasDinner={weekplan.hasDinner}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mainContainer">
                    <p>loading</p>
                </div>
            )}
        </>
    );
}
