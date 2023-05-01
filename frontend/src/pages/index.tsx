import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Benefits from '@components/Benefits/Benefits';

type Step = {
    id: number;
    desc: string;
    class: string;
    svg: CustomSVG;
};

type CustomSVG = {
    class: string;
    src: string;
    width: number;
    height: number;
};

export type Benefit = {
    id: number;
    icon: string;
    heading: string;
    desc: string;
};

export default function Index() {
    const fieldRef = useRef<HTMLInputElement>(null);

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

    const benefits: Benefit[] = [
        {
            id: 1,
            icon: '/Icons/Ei.svg',
            heading: 'Saves time and money',
            desc: 'by allowing for efficient grocery shopping and reducing food waste.',
        },
        {
            id: 2,
            icon: '/Icons/Ei.svg',
            heading: 'Promotes healthier eating habits',
            desc: 'by encouraging the consumption of a balanced and varied diet that meets nutritional needs and supports overall health.',
        },
        {
            id: 3,
            icon: '/Icons/Ei.svg',
            heading: 'Reduces food waste',
            desc: 'by helping you purchase only the necessary ingredients and use up items before they expire.',
        },
        {
            id: 4,
            icon: '/Icons/Ei.svg',
            heading: 'Reduces stress and decision fatigue',
            desc: 'by eliminating the need to constantly think about what to eat and simplifying mealtime preparation.',
        },
    ];

    const scrollTo = () => {
        fieldRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="px-14">
            <div className="flex flex-col justify-start h-screen">
                <div className="flex justify-between items-center">
                    <div className="flex items-center h-[150px]">
                        <Image src={'/logo.svg'} alt="logo" width={200} height={139} priority />
                    </div>
                    <Link href="/authentication/login">
                        <div className="flex justify-center bg-green-custom2 h-14 w-14 rounded-full">
                            <Image
                                src={'/Icons/Header/user.png'}
                                alt="logo"
                                height={30}
                                width={30}
                                priority
                                className="h-fit pt-[20%] invert"
                            />
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col items-center mb-6">
                    <Image src={'/startpageImg.svg'} alt="plate with food" width={1000} height={139} priority />
                    <p className="mb-4">Personalized meal planning</p>
                    <p className="mb-20">Tastyplan's Ai will delight your taste buds</p>
                    <Link href="/authentication/registration">
                        <span className="btn-primary w-1/2  border-2 border-solid border-gray-custom1 rounded-full">
                            <p className="h4 text-gray-custom1 px-[30px]">Start Planning</p>
                        </span>
                    </Link>
                </div>
                <button className="flex justify-center" onClick={scrollTo}>
                    <Image src={'/arrow_down.png'} alt="arrow down" width={40} height={80} priority />
                </button>
            </div>
            <div ref={fieldRef}>
                <div className="flex mb-16">
                    <div className="flex flex-col">
                        <h2>What is Tasty Plan</h2>
                        <p>
                            No more worrying about what to eat for the week or spending hours scouring the internet for
                            recipes. Tastyplan's AI does the work for you, creating a custom meal plan that fits your
                            lifestyle and satisfies your taste buds. And with a database of thousands of mouth-watering
                            recipes, you'll never get bored with your meals.
                        </p>
                    </div>
                    <Image src={'/whatIsTastyPlan.svg'} alt="a cookbook" width={1000} height={139} priority />
                </div>
                <p className="h2-zeyada-green text-center w-[842px] my-0 mx-auto">
                    Meal planning has never been easier and more delicious.
                </p>
            </div>
            <div>
                <h2 className="mb-24">But why Meal Planning</h2>
                <Benefits benefits={benefits} />
            </div>
            <h2 className="mb-24">How Does Tastyplan work</h2>
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
        </div>
    );
}
