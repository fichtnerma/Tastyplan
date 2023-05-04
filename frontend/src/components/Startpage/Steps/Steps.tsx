import React from 'react';
import Image from 'next/image';
import { CustomSVG } from 'src/types/types';

type Step = {
    id: number;
    desc: string;
    class: string;
    svg: CustomSVG;
};
function Steps() {
    const steps: Step[] = [
        {
            id: 1,
            desc: 'Set up your account by entering your dietary preferences, food allergies, and schedule. This will help Tastyplan generate a personalized meal plan for you.',
            class: 'relative flex items-center max-w-[764px] mr-auto mb-[15rem]',
            svg: {
                class: 'absolute top-[-2rem] right-[-24rem]',
                src: '/Curves/curve1.svg',
                width: 451,
                height: 416,
            },
        },
        {
            id: 2,
            desc: "Once you've set up your account, Tastyplan will generate a weekly meal plan for you, complete with recipes and a shopping list.",
            class: 'relative flex items-center max-w-[764px] ml-auto mb-[18rem]',
            svg: {
                class: 'absolute top-[8rem] right-[31rem]',
                src: '/Curves/curve2.svg',
                width: 814,
                height: 291,
            },
        },
        {
            id: 3,
            desc: 'Review your meal plan and make any necessary adjustments. You can swap out recipes, add or remove meals, and adjust portions as needed.',
            class: 'relative flex items-center max-w-[764px] mr-auto mb-[16rem]',
            svg: {
                class: 'absolute top-[1rem] right-[-25rem]',
                src: '/Curves/curve3.svg',
                width: 814,
                height: 291,
            },
        },
        {
            id: 4,
            desc: 'Print or save your shopping list and head to the grocery store to get everything you need for the week.',
            class: 'relative flex items-center max-w-[764px] ml-auto',
            svg: {
                class: '',
                src: '',
                width: 0,
                height: 0,
            },
        },
    ];
    return (
        <div className="flex flex-col w-[1440px] mx-auto my-0">
            {steps.map((step) => (
                <div key={step.id} className={step.class}>
                    <div className="flex flex-col justify-center items-center mr-8">
                        <span className="h3-green-dark">0{step.id}</span>
                        <p className="h4-green-dark mt-[-1rem]">step</p>
                    </div>
                    <p>{step.desc}</p>
                    {step.svg.src !== '' && (
                        <Image
                            src={step.svg.src}
                            alt="curve"
                            width={step.svg.width}
                            height={step.svg.height}
                            priority
                            className={step.svg.class}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Steps;
