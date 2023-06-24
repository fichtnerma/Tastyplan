import React from 'react';
import Image from 'next/image';
import { CustomSVG } from 'src/types/types';
import styles from './Steps.module.scss';

type Step = {
    id: number;
    desc: string;
    class: string;
    image: CustomSVG;
    svg: CustomSVG;
    foodimg: CustomSVG;
};
function Steps() {
    const steps: Step[] = [
        {
            id: 1,
            desc: 'Set up your account by entering your dietary preferences, food allergies, and schedule. This will help Tastyplan generate a personalized meal plan for you.',
            class: 'relative flex items-center max-w-[764px] mr-auto mb-[5rem] lg:mb-[15rem]',
            image: {
                class: `col-start-2 col-span-8 row-span-8 drop-shadow-md ${styles.image}`,
                src: '/Landingpage/PreferencesAllergene.png',
                width: 800,
                height: 800,
            },
            svg: {
                class: 'absolute top-[20rem] right-[-31rem] z-10',
                src: '/Curves/curve1.svg',
                width: 451,
                height: 506,
            },
            foodimg: {
                class: 'absolute top-[-15rem] right-[-35rem] 2xl:right-[-55rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]',
                src: '/Landingpage/FoodItems/Brokkoli.svg',
                width: 451,
                height: 506,
            },
        },
        {
            id: 2,
            desc: "Once you've set up your account, Tastyplan will generate a weekly meal plan for you, complete with recipes and a shopping list.",
            class: 'relative flex items-center max-w-[764px] ml-auto mb-[5rem] lg:mb-[22rem]',
            image: {
                class: `col-start-2 col-span-8 row-span-8 drop-shadow-md ${styles.image}`,
                src: '/Landingpage/CreateWeekplan.png',
                width: 800,
                height: 800,
            },
            svg: {
                class: 'absolute top-[58rem] right-[36rem] z-10',
                src: '/Curves/curve2.svg',
                width: 814,
                height: 291,
            },
            foodimg: {
                class: 'absolute top-[-10rem] left-[-30rem] 2xl:left-[-50rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]',
                src: '/Landingpage/FoodItems/Lauch.svg',
                width: 451,
                height: 506,
            },
        },
        {
            id: 3,
            desc: 'Review your meal plan and make any necessary adjustments. You can swap out recipes, add or remove meals, and adjust portions as needed.',
            class: 'relative flex items-center max-w-[764px] mr-auto mb-[5rem] lg:mb-[16rem]',
            image: {
                class: `col-start-2 col-span-8 row-span-8 drop-shadow-md ${styles.image}`,
                src: '/Landingpage/ShoppingList.png',
                width: 800,
                height: 800,
            },
            svg: {
                class: 'absolute top-[43rem] right-[-25rem]',
                src: '/Curves/curve3.svg',
                width: 814,
                height: 291,
            },
            foodimg: {
                class: 'absolute top-[-10rem] right-[-31rem] 2xl:right-[-51rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]',
                src: '/Landingpage/FoodItems/Kaese.svg',
                width: 451,
                height: 506,
            },
        },
        {
            id: 4,
            desc: 'Print or save your shopping list and head to the grocery store to get everything you need for the week.',
            class: 'relative flex items-center max-w-[764px] ml-auto',
            image: {
                class: `col-start-2 col-span-8 row-span-8 drop-shadow-md ${styles.image}`,
                src: '/Landingpage/Detailpage.png',
                width: 800,
                height: 800,
            },
            svg: {
                class: '',
                src: '',
                width: 0,
                height: 0,
            },
            foodimg: {
                class: 'absolute top-[-15rem] left-[-31rem] 2xl:left-[-51rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]',
                src: '/Landingpage/FoodItems/Fisch.svg',
                width: 451,
                height: 506,
            },
        },
    ];
    return (
        <div className={styles.steps}>
            <div className="flex flex-col w-full mx-auto my-0">
                {steps.map((step) => (
                    <div key={step.id} className={step.class}>
                        <div className="grid grid-cols-9 grid-rows-9">
                            <div className="flex flex-col row-span-9">
                                <span className="h1 text-green-custom2 !leading-none">0{step.id}</span>
                                <p className="h4 text-green-custom2 mt-[-1rem] lg:mt-[-3rem]">step</p>
                            </div>
                            <p className="col-span-8">{step.desc}</p>
                            {step.image.src !== '' && (
                                <Image
                                    src={step.image.src}
                                    alt=""
                                    width={step.image.width}
                                    height={step.image.height}
                                    loading="lazy"
                                    className={`${step.image.class}`}
                                />
                            )}
                        </div>
                        <div className="hidden lg:block">
                            {step.svg.src !== '' && (
                                <Image
                                    src={step.svg.src}
                                    alt="curve"
                                    width={step.svg.width}
                                    height={step.svg.height}
                                    loading="lazy"
                                    className={step.svg.class}
                                />
                            )}
                        </div>
                        <div className="hidden lg:block">
                            {step.foodimg.src !== '' && (
                                <Image
                                    src={step.foodimg.src}
                                    alt="curve"
                                    width={step.foodimg.width}
                                    height={step.foodimg.height}
                                    loading="lazy"
                                    className={step.foodimg.class}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Steps;
