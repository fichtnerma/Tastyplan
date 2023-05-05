import React, { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
    return (
        <div className="w-screen h-screen fixed flex-wrap top-0 left-0 flex justify-center content-center">
            <div className="w-2/3 max-w-[1500px] h-3/4 max-h-[600px] relative rounded-2xl bg-white-custom overflow-hidden">
                {children}
            </div>
        </div>
    );
}
