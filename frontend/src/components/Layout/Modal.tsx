import React, { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="w-full h-full bg-white-custom lg:w-2/3 lg:h-3/4 lg:max-w-[1500px] lg:max-h-[600px] lg:rounded-2xl">
            {children}
        </div>
    );
}
