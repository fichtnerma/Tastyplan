import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/Icon/Icon';
import { CustomSVG } from 'src/types/types';
import styles from './HeaderHome.module.scss';

type FoodImages = {
    id: number;
    image: CustomSVG;
};

function HeaderHome() {
    const foodImages: FoodImages[] = [
        {
            id: 1,
            image: {
                class: 'absolute top-2/4 left-[10%] w-36 sm:w-64 lg:w-80 h-36 sm:h-64 lg:h-96 hover:scale-110 transition-all',
                src: '/Landingpage/FoodItems/Brokkoli.svg',
                width: 300,
                height: 300,
            },
        },
        {
            id: 1,
            image: {
                class: 'absolute top-[-2%] left-[40%] w-36 sm:w-64 lg:w-80 h-36 sm:h-64 lg:h-96 hover:scale-110 transition-all',
                src: '/Landingpage/FoodItems/Karotte.svg',
                width: 500,
                height: 500,
            },
        },
        {
            id: 1,
            image: {
                class: 'absolute top-[40%] right-[-12%] w-36 sm:w-64 lg:w-80 h-36 sm:h-64 lg:h-96 hover:scale-110 transition-all',
                src: '/Landingpage/FoodItems/Fleisch.svg',
                width: 300,
                height: 300,
            },
        },
    ];
    return (
        <div className="grid grid-cols-[repeat(5,1fr)] grid-rows-[0.1fr_repeat(7,1fr)] gap-y-0 gap-x-0 h-[95vh]">
            <div className="items-center h-[100px] lg:h-[150px]">
                <Image src={'/logo.svg'} alt="logo" width={100} height={39} priority />
            </div>
            <div className="col-start-5 flex justify-end">
                <Link href="/authentication/login">
                    <div className="flex justify-center bg-green-custom2 h-14 w-14 rounded-full hover:bg-green-custom3">
                        <div className="h-fit pt-[20%] invert">
                            <Icon size={30} icon="user"></Icon>
                        </div>
                    </div>
                </Link>
            </div>
            <div className=" col-span-4 lg:col-span-2 row-span-3 lg:row-span-6 row-start-2  relative z-10">
                <h1 className="text-green-custom2 !mb-0 leading-none">Personalized Meal</h1>
                <h1 className="text-green-custom2 leading-none">Planning</h1>
                <h2 className="h5 !mb-0">- Tastyplan's AI will delight</h2>
                <h2 className="h5">your taste buds</h2>
                <div>
                    <div className="flex flex-col items-center w-fit">
                        <Link
                            href="/authentication/registration"
                            data-cy="start-planning-btn"
                            className="btn-primary btn-big mt-5"
                        >
                            Create Weekplan
                        </Link>
                        <div className={styles.underline}>
                            <div className="absolute w-0 h-0 overflow-hidden">
                                <svg viewBox="0 0 400 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        id="svg_line"
                                        d="m 1.986,8.91 c 55.429038,4.081 111.58111,5.822 167.11781,2.867 22.70911,-1.208 45.39828,-0.601 68.126,-0.778 28.38173,-0.223 56.76079,-1.024 85.13721,-1.33 24.17379,-0.261 48.42731,0.571 72.58115,0.571"
                                    ></path>
                                </svg>
                            </div>
                            <div className="flex mt-4 ">
                                <span className="h5 !font-zeyada pr-2">or</span>
                                <section className={`${styles.linkSvgline}`}>
                                    <a href="#downloadSection">
                                        <span className="h5 !font-zeyada text-green-custom2 hover:text-green-custom3">
                                            download it now!
                                        </span>
                                        <svg className={styles.linkSvgline}>
                                            <use xlinkHref="#svg_line"></use>
                                        </svg>
                                    </a>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-5 row-span-3 row-start-5 lg:col-span-3 lg:row-span-6 lg:col-start-3 lg:row-start-2 lg:ml-[-3rem] mt-0 md:mt-[-2rem] relative">
                <div className="grid grid-cols-4 grid-rows-1 gap-4 lg:gap-12 h-full">
                    <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                        <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>Monday</p>
                    </div>
                    <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                        <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>Tuesday</p>
                    </div>
                    <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                        <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>Wednesday</p>
                    </div>
                    <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                        <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>Thursday</p>
                    </div>
                </div>

                {foodImages.map((img) => (
                    <div key={img.image.src}>
                        <Image
                            src={img.image.src}
                            alt=""
                            width={img.image.width}
                            height={img.image.height}
                            className={img.image.class}
                        />
                    </div>
                ))}
            </div>

            <Link
                href="#scrollRef"
                className="col-start-3 row-start-8 text-green-custom2 hover:text-green-custom3 flex justify-center pt-8 z-10 animate-bounce"
            >
                <Icon size={100} icon="arrowDownCircle"></Icon>
            </Link>
        </div>
    );
}

export default HeaderHome;
