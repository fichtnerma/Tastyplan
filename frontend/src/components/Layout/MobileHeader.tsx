import Image from 'next/image';

function MobileHeader() {
    return (
        <div className="block relative lg:hidden">
            <Image
                src="/logo.svg"
                height={200}
                className="block absolute w-full max-w-[120px] h-auto pt-4 sm:max-w-[200px] md:max-w-[220px] lg:hidden"
                alt="logo"
                width={200}
                priority
            />
            <svg viewBox="0 0 390 182" fill="none" xmlns="http://www.w3.org/2000/svg" className="block lg:hidden">
                <path
                    d="M198.115 149.6C287.083 200.616 301.438 188.44 390 133.685L390 3.05176e-05L4.64285e-05 -3.5773e-06L3.40556e-05 141.53C103.052 96.8896 159.428 127.417 198.115 149.6Z"
                    fill="#D6E5E3"
                />
            </svg>
        </div>
    );
}

export default MobileHeader;
