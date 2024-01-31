import React from 'react';

interface IconProps {
    icon: string;
    size?: number;
    color?: string;
    classNames?: string;
    testId?: string;
}

export default function Icon({ color, icon, size = 24, classNames, testId }: IconProps) {
    return (
        <svg color={color} width={size} height={size} className={classNames} data-testid={testId}>
            <use href={`/Icons/${icon}.svg#${icon}`} />
        </svg>
    );
}
