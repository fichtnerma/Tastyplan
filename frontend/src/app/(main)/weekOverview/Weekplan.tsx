import React from 'react';
import RecipeCard from '@components/RecipeCard/RecipeCard';
import { WeekplanEntry } from 'src/types/types';
import DateList from './DateList';

type WeekplanProps = {
    day: WeekplanEntry;
    hasLunch: boolean;
    hasDinner: boolean;
    updateWeekplan: (date?: Date | undefined) => Promise<void>;
};

export default function Weekplan({ day, hasDinner, hasLunch, updateWeekplan }: WeekplanProps) {
    const today = new Date().getDay();
    const isToday = today == new Date(day.date).getDay();

    return (
        <>
            <DateList day={day} isToday={isToday} />

            <div className="flex sm:block gap-4">
                {hasLunch && (
                    <div className=" sm:mb-10 w-full">
                        <RecipeCard
                            recipe={day.lunch}
                            highlighted={isToday}
                            withSwitch={true}
                            smallCard={false}
                            entryId={day.id}
                            refreshWeekplan={updateWeekplan}
                            isLunch={true}
                            day={new Date(day.date).getDay()}
                        />
                    </div>
                )}
                {hasDinner && (
                    <RecipeCard
                        recipe={day.dinner}
                        highlighted={isToday}
                        withSwitch={true}
                        smallCard={false}
                        entryId={day.id}
                        refreshWeekplan={updateWeekplan}
                        day={new Date(day.date).getDay()}
                    />
                )}
            </div>
        </>
    );
}
