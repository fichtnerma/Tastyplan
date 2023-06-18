import React from 'react';

interface IconProps {
    icon: string;
    size?: number;
    color?: string;
    classNames?: string;
}

export default function Icon({ color, icon, size = 24, classNames }: IconProps) {
    return (
        <svg color={color} width={size} height={size} className={classNames}>
            <use href={`/Icons/${icon}.svg#${icon}`} />
        </svg>
    );
}
