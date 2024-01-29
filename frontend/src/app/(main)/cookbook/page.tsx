'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import SomeFavorites from '@components/SomeFavorites/SomeFavorites';
import Collections from '@components/Collections/Collections';
import { Role } from 'src/types/types';

function Cookbook() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <>
            <div className="mainContainer">
                <h1>{user?.role === Role.user ? user?.userId + "'s" : 'Your'} Cookbook</h1>

                <SomeFavorites />
                <Collections />
            </div>
        </>
    );
}

export default Cookbook;
