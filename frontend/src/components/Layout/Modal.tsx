import React, { PropsWithChildren } from 'react';
import Image from 'next/image';

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="lg:w-screen lg:h-screen lg:flex lg:justify-center lg:items-center lg:bg-green-custom1">
            <Image
                src={'/logo.svg'}
                className="hidden lg:absolute lg:top-9 lg:left-[4rem] lg:block"
                alt="Calendar Img"
                width={220}
                height={220}
                priority
            />
            <div className="w-full h-full bg-white-custom lg:relative lg:w-2/3 lg:max-w-[1500px] lg:h-3/4 lg:max-h-[600px] lg:rounded-2xl lg:overflow-hidden">
                {children}
            </div>
        </div>
    );
}
