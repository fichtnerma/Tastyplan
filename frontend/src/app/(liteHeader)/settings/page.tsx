'use client';
import React from 'react';
import PreferencesSettings from '@components/PreferencesSettings/PreferencesSettings';

function Settings() {
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
                        <button className="appearance-none bg-transparent">
                            <h3 className="hover:text-green-custom3 whitespace-nowrap">User settings</h3>
                        </button>
                        <button className="appearance-none bg-transparent">
                            <h3 className="hover:text-green-custom3">Preferences</h3>
                        </button>
                        <button className="appearance-none bg-transparent">
                            <h3 className="hover:text-green-custom3">Weekplan</h3>
                        </button>
                    </div>
                    <div className="" style={lineStyle}></div>
                </div>
                <div className="w-4/5">
                    <PreferencesSettings />
                </div>
            </div>
        </div>
    );
}

export default Settings;
