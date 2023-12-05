'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import WeekplanSettings from '@components/WeekplanSettings/WeekplanSettings';
// import UserSettings from '@components/UserSettings/UserSettings';
import PreferencesSettings from '@components/PreferencesSettings/PreferencesSettings';
import { fetchWithAuth } from '@helpers/utils';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { APISearchResponse } from 'src/types/types';
import 'react-toastify/dist/ReactToastify.css';

interface Preferences {
    formOfDiet: string;
    allergens: string[];
    foodDislikes: APISearchResponse[];
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    servings: number;
}

function Settings() {
    const [selectedSettingOption, setSelectedSettingOption] = useState('preferences');
    const [settings, setSettings] = useState<Preferences>();

    const { data: session } = useSession();
    const { data, error } = useFetchWithAuth('/service/preferences') as unknown as {
        data: Preferences;
        error: unknown;
    };

    if (data && !settings) {
        setSettings({
            formOfDiet: data.formOfDiet,
            allergens: data.allergens,
            foodDislikes: data.foodDislikes,
            days: data.days,
            wantsLunch: data.wantsLunch,
            wantsDinner: data.wantsDinner,
            servings: data.servings,
        });
    }

    const saveSettings = async (settings: Preferences) => {
        fetchWithAuth(
            '/service/preferences',
            {
                method: 'POST',
                body: JSON.stringify(settings),
            },
            session,
        );
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
            <div className="lg:flex inline">
                <div className="lg:w-1/5 lg:grid lg:grid-cols-2">
                    <div className="flex gap-10 lg:block">
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
                        {/* <button
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
                        </button> */}
                    </div>
                    <div className="hidden lg:block" style={lineStyle}></div>
                </div>
                {!error && data ? (
                    <div className="lg:w-4/5">
                        {selectedSettingOption === 'preferences' && settings ? (
                            <PreferencesSettings
                                formOfDiet={settings.formOfDiet}
                                allergens={settings.allergens}
                                foodDislikes={settings.foodDislikes}
                                onChoice={(setting: {
                                    formOfDiet: string;
                                    allergens: string[];
                                    foodDislikes: APISearchResponse[];
                                }) => {
                                    setSettings({
                                        ...settings,
                                        formOfDiet: setting.formOfDiet,
                                        allergens: setting.allergens,
                                        foodDislikes: setting.foodDislikes,
                                    });
                                }}
                            />
                        ) : (
                            <div></div>
                        )}
                        {selectedSettingOption === 'weekplan' && settings ? (
                            <WeekplanSettings
                                days={settings.days}
                                wantsLunch={settings.wantsLunch}
                                wantsDinner={settings.wantsDinner}
                                servings={settings.servings}
                                onChoice={(setting: {
                                    days: string[];
                                    wantsLunch: boolean;
                                    wantsDinner: boolean;
                                    servings: number;
                                }) => {
                                    setSettings({
                                        ...settings,
                                        days: setting.days,
                                        wantsLunch: setting.wantsLunch,
                                        wantsDinner: setting.wantsDinner,
                                        servings: setting.servings,
                                    });
                                }}
                            />
                        ) : (
                            <div></div>
                        )}
                        {/* {selectedSettingOption === 'user' && <UserSettings />} */}
                        <div>
                            <button
                                type="submit"
                                className="btn-primary float-right"
                                data-btn="next"
                                onClick={() => {
                                    if (settings !== undefined) saveSettings(settings);
                                    toast.success('Settings saved!');
                                }}
                                data-cy="next-btn"
                            >
                                Save
                            </button>
                            <ToastContainer
                                position="bottom-center"
                                autoClose={2000}
                                limit={1}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                        </div>
                    </div>
                ) : (
                    <div>loading . . .</div>
                )}
            </div>
        </div>
    );
}

export default Settings;
