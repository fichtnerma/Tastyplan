import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/Icon/Icon';

export default function index() {
    return (
        <div className="w-full mt-[-20px]">
            <div className="h-screen">
                <div className="flex justify-between">
                    <div className="flex h-[150px]">
                        <Image src={'/logo.svg'} alt="logo" width={200} height={139} priority />
                    </div>
                    <Link href="/authentication/login">
                        <div className="flex justify-center bg-green-custom2 h-14 w-14 rounded-full mt-5">
                            {/* <Image
                                src={'/Icons/Header/user.png'}
                                alt="logo"
                                height={30}
                                width={30}
                                priority
                                className="h-fit pt-[20%] invert"
                            /> */}
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
                        <p className="text-center mb-20">create your personalized meal plan!</p>
                        <div className="flex justify-center">
                            <Link href="/authentication/registration">
                                <button className="btn-primary w-1/2  border-2 border-solid border-gray-custom1 rounded-full">
                                    <h4 className="text-gray-custom1 px-[30px]">Start Planning</h4>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-40 mt-10 flex">
                <div className="flex justify-center h-[400px]">
                    <Image src={'/whatIsTastyPlan.svg'} alt="img" width={1000} height={1200} priority />
                </div>
                <div className="w-4/5">
                    <h2>What is Tasty Plan?</h2>
                    <p className="text-justify">
                        No more worrying about what to eat for the week or spending hours scouring the internet for
                        recipes. Tastyplan's AI does the work for you, creating a custom meal plan that fits your
                        lifestyle and satisfies your taste buds. And with a database of thousands of mouth-watering
                        recipes, you'll never get bored with your meals. With Tastyplan, meal planning has never been
                        easier or more delicious. Try Tastyplan today and taste the future of meal planning!
                    </p>
                </div>
            </div>
            <div className="mb-40 mt-10 flex">
                <div className="w-4/5">
                    <h2>How does it work?</h2>
                    <p className="text-justify mb-2">1. Sign up for an account.</p>
                    <p className="text-justify mb-2">
                        2. Set up your account by entering your dietary preferences, food allergies, and food dislikes.
                        This will help Tastyplan generate a personalized meal plan for you.
                    </p>
                    <p className="text-justify mb-2">
                        3. Once you've set up your account, Tastyplan will generate a weekly meal plan for you, complete
                        with recipes and a shopping list.
                    </p>
                    <p className="text-justify mb-2">
                        4. Head to the grocery store to get everything you need for the week.
                    </p>
                    <p className="text-justify mb-2">
                        5. Follow the recipes provided by Tastyplan to prepare your meals for the week.
                    </p>
                    <p className="text-justify mb-2">
                        6. Enjoy delicious and hassle-free meal planning with Tastyplan!
                    </p>
                </div>
                <div className="flex justify-center h-[600px]">
                    <Image src={'/anleitung.svg'} alt="img" width={900} height={1200} priority />
                </div>
            </div>
        </div>
    );
}
