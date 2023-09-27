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
        <div className={styles.headerHome}>
            <div className={styles.grid}>
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
                    <div className="">
                        <Link href="/authentication/registration" data-cy="start-planning-btn" className="btn-primary">
                            Start Planning
                        </Link>
                    </div>
                </div>
                <div className="col-span-5 row-span-3 row-start-5 lg:col-span-3 lg:row-span-6 lg:col-start-3 lg:row-start-2 lg:ml-[-3rem] mt-[-2rem] relative">
                    <div className="grid grid-cols-4 grid-rows-1 gap-4 lg:gap-12 h-full">
                        <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                            <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>
                                Monday
                            </p>
                        </div>
                        <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                            <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>
                                Tuesday
                            </p>
                        </div>
                        <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                            <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>
                                Wednesday
                            </p>
                        </div>
                        <div className="bg-green-custom1 h-[90%] rounded-[12px] lg:rounded-[30px]">
                            <p className={`h5 !font-zeyada text-green-custom2  text-center my-0 mx-auto pt-2`}>
                                Thursday
                            </p>
                        </div>
                    </div>

                    {foodImages.map((img) => (
                        <div key={img.image.src}>
                            <Image
                                src={img.image.src}
                                alt=""
                                width={img.image.width}
                                height={img.image.height}
                                loading="lazy"
                                className={img.image.class}
                            />
                        </div>
                    ))}
                </div>

                <Link
                    href="#scrollRef"
                    className="col-start-3 row-start-8 text-green-custom2 hover:text-green-custome3 flex justify-center pt-8 z-10 animate-bounce"
                >
                    <Icon size={100} icon="arrowDownCircle"></Icon>
                </Link>
            </div>
        </div>
    );
}

export default HeaderHome;
