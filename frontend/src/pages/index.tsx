import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Steps from '@components/Startpage/Steps/Steps';
import Benefits from '@components/Startpage/Benefits/Benefits';
import Icon from '@components/Icon/Icon';

export type Benefit = {
    id: number;
    icon: string;
    heading: string;
    desc: string;
};

export default function Index() {
    const fieldRef = useRef<HTMLInputElement>(null);

    const scrollTo = () => {
        fieldRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="">
            <div className="flex flex-col justify-start h-screen">
                <div className="flex justify-between items-center">
                    <div className="flex items-center h-[150px]">
                        <Image src={'/logo.svg'} alt="logo" width={200} height={139} priority />
                    </div>
                    <Link href="/authentication/login">
                        <div className="flex justify-center bg-green-custom2 h-14 w-14 rounded-full mt-5 hover:bg-green-custome3">
                            <div className="h-fit pt-[20%] invert">
                                <Icon size={30} icon="user"></Icon>
                            </div>
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
            <div className="pt-40">
                <h2 className="mb-24">But why Meal Planning</h2>
                <Benefits />
            </div>
            <div className="pt-40">
                <h2 className="mb-24">How Does Tastyplan work</h2>
                <Steps />
            </div>
        </div>
    );
}
