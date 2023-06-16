import React, { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="lg:w-screen lg:h-screen lg:fixed lg:flex-wrap lg:top-0 lg:left-0 lg:flex lg:justify-center lg:content-center lg:bg-green-custom1">
            <div className="w-full h-full bg-white-custom lg:relative lg:w-2/3 lg:max-w-[1500px] lg:h-3/4 lg:max-h-[600px] lg:rounded-2xl lg:overflow-hidden">
                {children}
            </div>
        </div>
    );
}
