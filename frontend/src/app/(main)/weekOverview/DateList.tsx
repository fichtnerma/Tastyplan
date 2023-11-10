import React from 'react';
import { WeekplanEntry } from 'src/types/types';

type DateFormatOptions = {
    year: '2-digit' | 'numeric';
    month: '2-digit' | 'numeric' | 'narrow' | 'short' | 'long';
    day: '2-digit' | 'numeric';
};

type DateListProps = {
    day: WeekplanEntry;
    isToday: boolean;
};

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DATE_OPTIONS: DateFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };

export default function DateList({ day, isToday }: DateListProps) {
    return (
        <>
            <div className="sm:mb-5">
                <h3
                    className="h3 !mb-0 !leading-none"
                    style={{
                        color: isToday ? 'var(--green-dark)' : 'var(--black)',
                    }}
                >
                    {WEEK_DAYS[new Date(day.date).getDay()]}
                </h3>
                <h4
                    className="h6 !mb-0"
                    style={{
                        color: isToday ? 'var(--green-dark)' : 'var(--gray-3)',
                    }}
                >
                    {new Date(day.date).toLocaleDateString('de-DE', DATE_OPTIONS)}
                </h4>
            </div>
        </>
    );
}
