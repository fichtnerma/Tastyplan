import Image from 'next/image';

function DesktopHeader() {
    return (
        <div className="hidden lg:block lg:h-[20vh] lg:bg-green-custom1">
            <Image
                src={'/logo.svg'}
                className="block w-full max-w-[280px]  pt-9 pl-[4rem]"
                alt="Calendar Img"
                width={250}
                height={250}
                priority
            />
        </div>
    );
}

export default DesktopHeader;
