'use client';
import React, { useState } from 'react';
import WeekplanSettings from '@components/WeekplanSettings/WeekplanSettings';
import UserSettings from '@components/UserSettings/UserSettings';
import PreferencesSettings from '@components/PreferencesSettings/PreferencesSettings';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { APISearchResponse } from 'src/types/types';

interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    days: number[];
    meals: number[];
    servings: number;
}

function Settings() {
    const [selectedSettingOption, setSelectedSettingOption] = useState('user');
    const { data, error } = useFetchWithAuth('/service/preferences') as unknown as {
        data: Preferences;
        error: unknown;
    };

    const lineStyle: React.CSSProperties = {
        width: '5px',
        height: '100%',
        backgroundColor: 'var(--green-light)',
        position: 'relative',
        right: '-75%',
        transform: 'translateX(-50%)',
        borderRadius: '30px',
    };
    return (
        <div className="mainContainer">
            <h1 className="text-green-custom2">Settings</h1>
            <div className="flex">
                <div className="w-1/5 grid grid-cols-2">
                    <div className="">
                        <button
                            className="appearance-none bg-transparent"
                            onClick={() => setSelectedSettingOption('user')}
                        >
                            <h3
                                className={`hover:text-green-custom3 whitespace-nowrap ${
                                    selectedSettingOption === 'user' ? 'text-green-custom3' : ''
                                }`}
                            >
                                User settings
                            </h3>
                        </button>
                        <button
                            className="appearance-none bg-transparent"
                            onClick={() => setSelectedSettingOption('preferences')}
                        >
                            <h3
                                className={`hover:text-green-custom3 ${
                                    selectedSettingOption === 'preferences' ? 'text-green-custom3' : ''
                                }`}
                            >
                                Preferences
                            </h3>
                        </button>
                        <button
                            className="appearance-none bg-transparent"
                            onClick={() => setSelectedSettingOption('weekplan')}
                        >
                            <h3
                                className={`hover:text-green-custom3 ${
                                    selectedSettingOption === 'weekplan' ? 'text-green-custom3' : ''
                                }`}
                            >
                                Weekplan
                            </h3>
                        </button>
                    </div>
                    <div className="" style={lineStyle}></div>
                </div>
                {!error && data ? (
                    <div className="w-4/5">
                        {selectedSettingOption === 'preferences' && (
                            <PreferencesSettings
                                formOfDiet={data.formOfDiet}
                                allergens={data.allergens}
                                foodDislikes={data.foodDislikes}
                                onSave={(settings: {
                                    formOfDiet: string;
                                    allergens: string[];
                                    foodDislikes: APISearchResponse[];
                                }) => {
                                    data.formOfDiet = settings.formOfDiet;
                                    data.allergens = settings.allergens;
                                    data.foodDislikes = settings.foodDislikes;
                                    console.log(data);
                                }}
                            />
                        )}
                        {selectedSettingOption === 'weekplan' && <WeekplanSettings />}
                        {selectedSettingOption === 'user' && <UserSettings />}
                    </div>
                ) : (
                    <div>loading . . .</div>
                )}
            </div>
        </div>
    );
}

export default Settings;
