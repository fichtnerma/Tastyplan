import Image from 'next/image';

type SecondHeaderProps = {
    waveForm: 'strong' | 'lite';
};

function SecondHeader({ waveForm }: SecondHeaderProps) {
    return (
        <>
            {waveForm === 'strong' ? (
                <div className="block relative lg:h-[10vh] lg:bg-green-custom1">
                    <Image
                        src="/logo.svg"
                        height={200}
                        className="block absolute w-full h-auto pt-4 max-w-[120px] sm:max-w-[200px] md:max-w-[220px]"
                        alt="logo"
                        width={200}
                        priority
                    />
                    <svg
                        viewBox="0 0 390 182"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block lg:hidden"
                    >
                        <path
                            d="M198.115 149.6C287.083 200.616 301.438 188.44 390 133.685L390 3.05176e-05L4.64285e-05 -3.5773e-06L3.40556e-05 141.53C103.052 96.8896 159.428 127.417 198.115 149.6Z"
                            fill="#D6E5E3"
                        />
                    </svg>
                </div>
            ) : (
                <div className="h-[10vh] md:hidden">
                    <Image
                        src="/logo.svg"
                        height={200}
                        className="block absolute w-full h-auto pt-4 max-w-[60px] sm:max-w-[120px] md:max-w-[150px] lg:hidden"
                        alt="logo"
                        width={200}
                        priority
                    />
                    <svg
                        viewBox="0 0 390 76"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block lg:hidden"
                    >
                        <path
                            d="M198.115 68.0838C302.5 82.8147 287.5 74.7334 390 60.7343L390 -0.999954L6.8029e-05 -0.999987L6.20867e-05 64.3569C163 52.7984 163 63.1284 198.115 68.0838Z"
                            fill="#D6E5E3"
                        />
                    </svg>
                </div>
            )}
        </>
    );
}

export default SecondHeader;
