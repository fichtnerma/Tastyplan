'use client';
// import React, { useEffect } from 'react';
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
                src: '/Curves/curve1.svg#animated-svg1',
                width: 501,
                height: 506,
            },
            foodimg: {
                class: 'absolute top-[-15rem] right-[-35rem] 2xl:right-[-55rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]  hover:scale-110 transition-all',
                src: '/Landingpage/FoodItems/Brokkoli.svg',
                width: 451,
                height: 506,
            },
        },
        {
            id: 2,
            desc: 'Tastyplan will generate a weekly meal plan for you, complete with recipes and a shopping list.',
            class: 'relative flex items-center max-w-[764px] ml-auto mb-[5rem] lg:mb-[22rem]',
            image: {
                class: `col-start-2 col-span-8 row-span-8 drop-shadow-md ${styles.image}`,
                src: '/Landingpage/CreateWeekplan.png',
                width: 800,
                height: 800,
            },
            svg: {
                class: 'absolute top-[37rem] right-[26rem] z-10',
                src: '/Curves/curve2.svg#animated-svg2',
                width: 814,
                height: 291,
            },
            foodimg: {
                class: 'absolute top-[-10rem] left-[-30rem] 2xl:left-[-50rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]  hover:scale-110 transition-all',
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
                class: 'absolute top-[32rem] right-[-28rem]',
                src: '/Curves/curve3.svg#animated-svg3',
                width: 1014,
                height: 491,
            },
            foodimg: {
                class: 'absolute top-[-10rem] right-[-31rem] 2xl:right-[-51rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]  hover:scale-110 transition-all',
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
                class: 'absolute top-[-15rem] left-[-31rem] 2xl:left-[-51rem] h-[500px] w-[500px] 2xl:h-[700px] 2xl:w-[700px]  hover:scale-110 transition-all',
                src: '/Landingpage/FoodItems/Fisch.svg',
                width: 451,
                height: 506,
            },
        },
    ];

    // useEffect(() => {
    //     // Get a reference to the <path>
    //     const svgContainers = document.querySelectorAll('#svg-container') as NodeListOf<SVGSVGElement>;

    //     svgContainers.forEach((svgContainer) => {
    //         const paths = svgContainer.querySelectorAll('#animated-path') as NodeListOf<SVGPathElement>;

    //         paths.forEach((path) => {
    //             const pathLength = path.getTotalLength();

    //             path.style.strokeDasharray = pathLength + ' ' + pathLength;

    //             path.style.strokeDashoffset = pathLength.toString();

    //             path.getBoundingClientRect();

    //             window.addEventListener('scroll', function () {
    //                 const containerRect = svgContainer.getBoundingClientRect();
    //                 const containerScrollTop = window.scrollY - containerRect.top;
    //                 const containerHeight = window.scrollY + containerRect.height;

    //                 const scrollPercentage = containerScrollTop / containerHeight;

    //                 const drawLength = pathLength * scrollPercentage;

    //                 path.style.strokeDashoffset = (pathLength - drawLength).toString();

    //                 if (scrollPercentage >= 0.99) {
    //                     path.style.strokeDasharray = 'none';
    //                 } else {
    //                     path.style.strokeDasharray = (pathLength + ' ' + pathLength).toString();
    //                 }
    //             });
    //         });
    //     });
    // }, []);

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
                            <div id="svg-container" className={step.svg.class}>
                                {step.svg.src !== '' && (
                                    <svg width={step.svg.width} height={step.svg.height}>
                                        <use href={step.svg.src} />
                                    </svg>
                                )}
                            </div>
                        </div>
                        {/* <div className="hidden lg:block">
                            {step.foodimg.src !== '' && (
                                <Image
                                    src={step.foodimg.src.toString()}
                                    alt="curve"
                                    width={step.foodimg.width}
                                    height={step.foodimg.height}
                                    loading="lazy"
                                    className={step.foodimg.class}
                                />
                            )}
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Steps;
