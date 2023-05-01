import React from 'react';

interface IconProps {
    icon: string;
    size?: number;
    color?: string;
}

export default function Icon({ color, icon, size = 24 }: IconProps) {
    return (
            <svg color={color} width={size} height={size}>
                <use href={`/Icons/${icon}.svg#${icon}`} />
            </svg>
    );
}
