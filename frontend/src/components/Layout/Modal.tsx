import React, { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="w-screen h-screen fixed flex-wrap top-0 left-0 flex justify-center content-center">
            <div className="relative bg-white-custom overflow-hidden w-full h-full lg:w-2/3 lg:h-3/4 lg:max-w-[1500px] lg:max-h-[600px] lg:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
