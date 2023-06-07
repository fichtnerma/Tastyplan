import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Steps from '@components/Startpage/Steps/Steps';
import Benefits from '@components/Startpage/Benefits/Benefits';
import Icon from '@components/Icon/Icon';
import styles from '../styles/Home.module.scss';

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

    function startAnimation() {
        const animationClass = `${styles.animTypewriter}`;

        const element = document.querySelector('.animation');

        element?.classList.add(animationClass);
    }

    return (
        <div className="">
            <div className="flex flex-col justify-start h-screen">
                <div className="flex justify-between items-center">
                    <div className="flex items-center h-[150px]">
                        <Image src={'/logo.svg'} alt="logo" width={200} height={139} priority />
                    </div>
                    <Link href="/authentication/login">
                        <div className="flex justify-center bg-green-custom2 h-14 w-14 rounded-full hover:bg-green-custome3">
                            <div className="h-fit pt-[20%] invert">
                                <Icon size={30} icon="user"></Icon>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center justify-center h-3/5">
                    <div>
                        <div className="flex justify-center h-[350px] mt-[-100px]">
                            <Image src={'/startpageImg.svg'} alt="img" width={600} height={800} priority />
                        </div>
                        <p className="text-center">Tastyplan's AI will delight your taste buds -</p>
                        <p className="text-center mb-10">create your personalized meal plan!</p>
                        <div className="flex justify-center">
                            <Link href="/authentication/registration">
                                <button className="btn-primary w-1/2 rounded-full" data-cy="start-planning-btn">
                                    <h4 className="text-white-custom px-[30px]">Start Planning</h4>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <button className="flex justify-center hover:text-green-custome3 mt-8" onClick={scrollTo}>
                    <Icon size={40} icon="arrowDownCircle"></Icon>
                </button>
            </div>
            <div ref={fieldRef} onMouseOver={startAnimation}>
                <div className="flex pt-8">
                    <div className="flex flex-col">
                        <h2>What is Tasty Plan?</h2>
                        <p>
                            No more worrying about what to eat for the week or spending hours scouring the internet for
                            recipes. Tastyplan's AI does the work for you, creating a custom meal plan that fits your
                            lifestyle and satisfies your taste buds. And with a database of thousands of mouth-watering
                            recipes, you'll never get bored with your meals.
                        </p>
                    </div>
                    <Image src={'/whatIsTastyPlan.svg'} alt="a cookbook" width={800} height={139} loading="lazy" />
                </div>
                <p className={`h2-zeyada-green text-center my-0 mx-auto mt-20 animation ${styles.line}`}>
                    Meal planning has never been easier and more delicious.
                </p>
            </div>
            <div className="pt-96">
                <h2 className="mb-24">But why Meal Planning?</h2>
                <Benefits />
            </div>
            <div className="pt-96 w-full">
                <h2 className="mb-24">How Does Tastyplan work?</h2>
                <Steps />
            </div>

            <div className="my-80 flex justify-center">
                <Link href="/authentication/registration">
                    <span className="btn-primary w-1/2 rounded-full">
                        <h4 className="text-white-custom px-[30px]">Start Planning</h4>
                    </span>
                </Link>
            </div>
        </div>
    );
}
