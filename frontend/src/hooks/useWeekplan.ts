import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchWithAuth } from '@helpers/utils';
import { Weekplan } from 'src/types/types';

export const useWeekplan = () => {
    const [weekplan, setWeekplan] = useState<Weekplan>();
    const [weekplanDate, setWeekplanDate] = useState<Date | undefined>(undefined);
    const { data: session } = useSession();
    useEffect(() => {
        const fetchWeekplan = async () => {
            const weekplanResource = weekplanDate ? `/service/weekplan/${weekplanDate}` : '/service/weekplan/current';
            if (!session) return;
            const response = await fetchWithAuth(
                weekplanResource,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                session,
            );
            const weekplan = await response.json();
            setWeekplan(weekplan);
        };
        fetchWeekplan();
    }, [session, weekplanDate]);

    const updateWeekplan = async (date?: Date) => {
        setWeekplanDate(date);
    };

    return { weekplan, updateWeekplan };
};
