import Image from 'next/image';

function DesktopHeader() {
    return (
        <div className="hidden lg:block lg:h-[10vh] lg:bg-green-custom1">
            <Image
                src={'/logo.svg'}
                className="block w-full max-w-[250px]  pt-7 pl-[4rem]"
                alt="Calendar Img"
                width={250}
                height={250}
                priority
            />
        </div>
    );
}

export default DesktopHeader;
