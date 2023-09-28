import Link from 'next/link';
import Image from 'next/image';
import Steps from '@components/Startpage/Steps/Steps';
import RecipesHome from '@components/Startpage/Recipes/RecipesHome';
import HeaderHome from '@components/Startpage/HeaderHome/HeaderHome';
import Benefits from '@components/Startpage/Benefits/Benefits';

export type Benefit = {
    id: number;
    icon: string;
    heading: string;
    desc: string;
};

export default function HomePage() {
    return (
        <div className="w-full max-w-[1600px] ml-auto mr-auto p-6 lg:p-14">
            <HeaderHome />
            <div id="scrollRef" className="flex w-full h-[60vh] lg:h-[80vh] pt-8">
                <div className="flex flex-col pt-20 lg:pt-40 w-full relative">
                    <Image
                        src="/Landingpage/FoodItems/Kaese.svg"
                        alt=""
                        width="1200"
                        height="1200"
                        loading="lazy"
                        className="absolute w-[700px] lg:w-[1000px] left-[-240px] top-[-130px] md:top-[-100px] !max-w-none"
                    />
                    <div className="z-10">
                        <h2 className="">What is Tasty Plan?</h2>
                        <p className="sm:w-1/2 2xl:w-1/3 backdrop-blur-sm">
                            No more worrying about what to eat for the week or spending hours scouring the internet for
                            recipes. Tastyplan's AI does the work for you, creating a custom meal plan that fits your
                            lifestyle and satisfies your taste buds. With a database of hundreds of mouth-watering
                            recipes, you'll never get bored with your meals.
                        </p>
                    </div>
                </div>
            </div>
            <div className="pt-20 md:pt-10 lg:pt-60">
                <h2 className="mb-10">But why Meal Planning?</h2>
                <Benefits />
            </div>
            <div className="pt-10 lg:pt-40 w-full">
                <h2 className="mb-8 lg:mb-24">How Does Tastyplan work?</h2>
                <Steps />
            </div>

            <div className="my-40 flex justify-center">
                <Link href="/authentication/registration" data-cy="start-planning-btn" className="btn-primary">
                    Start Planning
                </Link>
            </div>

            <RecipesHome />

            <div className="text-right relative my-10">
                <h2 className="leading-none mb-0 z-10 relative">Good Food</h2>
                <h2 className="leading-none mt-0 z-10 relative">Good Mood</h2>
                <div className="bg-green-custom1  w-40 md:w-60 lg:w-80 h-10 md:h-14 lg:h-20 absolute right-[-1rem] top-2 md:top-4 lg:top-6"></div>
            </div>

            <div className="my-20 flex justify-center">
                <Link href="/authentication/registration" data-cy="start-planning-btn" className="btn-primary">
                    Start Planning
                </Link>
            </div>
        </div>
    );
}
