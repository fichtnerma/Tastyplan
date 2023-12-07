import Link from 'next/link';
import Image from 'next/image';
import Steps from '@components/Startpage/Steps/Steps';
import RecipesHome from '@components/Startpage/Recipes/RecipesHome';
import HeaderHome from '@components/Startpage/HeaderHome/HeaderHome';
import Download from '@components/Startpage/Download/Download';
import Benefits from '@components/Startpage/Benefits/Benefits';
import Icon from '@components/Icon/Icon';
import Footer from '@components/Footer/Footer';

export type Benefit = {
    id: number;
    icon: string;
    heading: string;
    desc: string;
};

export default function HomePage() {
    return (
        <>
            <div className="w-full max-w-[1600px] ml-auto mr-auto p-6 lg:p-14 !pb-0">
                <HeaderHome />
                <div id="scrollRef" className="flex w-full lg:h-[80vh] py-20 h-fit">
                    <div className="flex flex-col w-full relative">
                        <div className="z-10">
                            <div className="grid grid-cols-3 grid-rows-1">
                                <div className="col-span-2">
                                    <div className="hidden md:block">
                                        <h2 className="!mb-0">No more worrying about</h2>
                                        <h2 className="!mb-0">what to eat for the week</h2>
                                    </div>
                                    <h2 className="!mb-0 md:hidden">No more worrying about what to eat for the week</h2>
                                    <p className="sm:w-1/2 xl:w-1/3">
                                        or spending hours scouring the internet for recipes.
                                    </p>
                                    <p className=" w-[80vw] sm:w-5/6 3 mt-5">
                                        Tastyplan's AI does the work for you, creating a custom meal plan that fits your
                                        lifestyle and satisfies your taste buds. With a database of hundreds of
                                        mouth-watering recipes, you'll never get bored with your meals.
                                    </p>
                                    <Link
                                        className="flex mt-5"
                                        href="https://www.producthunt.com/posts/tastyplan?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-tastyplan"
                                        target="_blank"
                                    >
                                        <Image
                                            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=401266&theme=light&period=daily"
                                            alt="TastyPlan - Create&#0032;your&#0032;personalized&#0032;meal&#0032;plan | Product Hunt"
                                            style={{ width: 250 + 'px', height: 54 + 'px' }}
                                            width="250"
                                            height="54"
                                        ></Image>
                                    </Link>
                                </div>
                                <Image
                                    src="/Landingpage/FoodItems/Kaese.svg"
                                    alt=""
                                    width="1200"
                                    height="1200"
                                    loading="lazy"
                                    className="col-start-3 pt-5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-green-custom1 w-full ml-auto mr-auto p-6 lg:p-14">
                <div className="w-full max-w-[1600px] ml-auto mr-auto px-6 lg:px-14">
                    <h2 className="mb-10">But why Meal Planning?</h2>
                    <Benefits />
                </div>
            </div>
            <div className="w-full max-w-[1600px] ml-auto mr-auto px-6 py-20 lg:px-14">
                <div className="w-full">
                    <h2 className="mb-8 lg:mb-24">How Does Tastyplan work?</h2>
                    <Steps />
                </div>

                <div className="pt-20 flex justify-center">
                    <Link
                        href="/authentication/registration"
                        data-cy="start-planning-btn"
                        className="btn-create-weekplan"
                    >
                        Create Weekplan
                        <Icon classNames="inline ml-4 w-[1em] h-[1em]" icon="magic" />
                    </Link>
                </div>
            </div>
            <div className="w-full ml-auto mr-auto px-6 lg:px-14">
                <RecipesHome />
            </div>
            <div className="w-full max-w-[1600px] ml-auto mr-auto pt-20 p-6 lg:p-14">
                {/* <div className="text-right relative my-10">
                    <h2 className="leading-none mb-0 z-10 relative">Good Food</h2>
                    <h2 className="leading-none mt-0 z-10 relative">Good Mood</h2>
                    <div className="bg-green-custom1  w-40 md:w-60 lg:w-80 h-10 md:h-14 lg:h-20 absolute right-[-1rem] top-2 md:top-4 lg:top-6"></div>
                </div> */}
                <div id="downloadSection">
                    <Download />
                </div>

                <p className={`h5 !font-zeyada text-green-custom2  text-center mt-16 !mb-1 mx-auto`}>
                    or just start right away
                </p>
                <div className="mb-20  flex justify-center">
                    <Link
                        href="/authentication/registration"
                        data-cy="start-planning-btn"
                        className="btn-create-weekplan"
                    >
                        Create Weekplan
                        <Icon classNames="inline ml-4 w-[1em] h-[1em]" icon="magic" />
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
