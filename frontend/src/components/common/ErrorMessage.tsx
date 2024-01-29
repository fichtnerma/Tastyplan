import React, { PropsWithChildren } from 'react';
import Icon from '@components/Icon/Icon';

export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <p className="text-red-custom text-sm relative pl-5">
            <Icon classNames="inline-block absolute left-0 top-px" size={16} icon="alert"></Icon>
            <span data-cy="text-input-error-msg">{children}</span>
        </p>
    );
}
