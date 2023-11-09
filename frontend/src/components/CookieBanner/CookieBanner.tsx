// app/banner.js
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Banner({ setCookiesAccepted }: { setCookiesAccepted: (value: boolean) => void }) {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const cookiesAccepted = document.cookie
            .split(';')
            .some((item) => item.trim().startsWith('tastyplan-cookiesAccepted='));

        setShowBanner(!cookiesAccepted);
    }, [showBanner]);

    if (!showBanner) {
        return null;
    }

    const acceptCookies = () => {
        setShowBanner(false);
        document.cookie = 'tastyplan-cookiesAccepted=true; path=/';
        setCookiesAccepted(true);
    };

    const declineCookies = () => {
        setShowBanner(false);
        document.cookie = 'tastyplan-cookiesAccepted=false; path=/';
        setCookiesAccepted(false);
    };

    return (
        <div className="fixed bottom-4 right-0 w-full md:w-1/2 lg:w-1/3 z-50">
            <div className="mx-4 bg-[#D1B490] p-5 pt-0 rounded-custom_xs shadow-md relative">
                <Image
                    className="mx-auto h-[80px] md:h-[120px] w-[80px] md:w-[120px]"
                    src="/Landingpage/cookie_image.svg"
                    alt="icon"
                    width={120}
                    height={120}
                    loading="lazy"
                />

                <h4 className="mb-0">We use cookies</h4>
                <p className="text-xs">
                    We use tracking cookies to understand how you use the product and help us improve it. Please accept
                    cookies to help us improve.
                </p>
                <div className="flex justify-around p-5 pb-0">
                    <button className="btn-primary btn-small" type="button" onClick={acceptCookies}>
                        Accept cookies
                    </button>
                    <button className="btn-primary btn-small" type="button" onClick={declineCookies}>
                        Decline cookies
                    </button>
                </div>
            </div>
        </div>
    );
}
