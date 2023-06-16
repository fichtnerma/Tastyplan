import React, { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="lg:w-screen lg:h-[80vh] lg:flex lg:justify-center lg:bg-green-custom1">
            <div className="w-full h-full bg-white-custom lg:relative lg:w-2/3 lg:max-w-[1700px] lg:h-3/4 lg:max-h-[600px] lg:rounded-2xl lg:overflow-hidden">
                {children}
            </div>
        </div>
    );
}
