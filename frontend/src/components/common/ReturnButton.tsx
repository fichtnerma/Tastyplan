'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@components/Icon/Icon';

export default function ReturnButton() {
    const router = useRouter();
    return (
        <button type="button" onClick={() => router.back()}>
            <Icon size={80} icon="arrowBack"></Icon>
        </button>
    );
}
