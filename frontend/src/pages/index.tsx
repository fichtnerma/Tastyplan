import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';
import startImg from '../../public/startpageImg.svg';
import user from '../../public/Icons/Header/user.png';
import whatIsTasytPlanImg from '../../public/whatIsTastyPlan.svg'

export default function index() {
    return (
        <div className="w-full mt-[-20px]">
            <div className='flex justify-between'>
                <div className="flex h-[150px]">
                    <Image src={logo} alt="logo" width={200} height={139} priority />
                </div>
                <Link href="/authentication/login">
                    <div className="flex justify-center bg-green-custom2 h-14 w-14 rounded-full mt-5">
                        <Image src={user} alt="logo" height={30} width={30} priority className='h-fit pt-[20%]' />
                    </div>
                </Link>
            </div>
            <div className="flex justify-center h-[350px] mt-[-100px]">
                <Image src={startImg} alt="img" width={600} height={800} priority />
            </div>
            <p className='text-center'>Tastyplan's AI will delight your taste buds -</p>
            <p className='text-center mb-20'>create your personalized meal plan!</p>
            <div className="flex justify-center">
                <Link href="/authentication/registration">
                    <button className="btn-primary w-1/2  border-2 border-solid border-gray-custom1 rounded-full">
                        <h4 className="text-gray-custom1 px-[30px]">Start Planning</h4>
                    </button>
                </Link>
            </div>
            <div className='my-40 flex'>
                <div className='w-4/5'>
                    <h2>What is Tasty Plan?</h2>
                    <p>No more worrying about what to eat for the week or spending hours scouring the internet for recipes.
                        Tastyplan's AI does the work for you, creating a custom meal plan that fits your lifestyle and satisfies your taste buds.
                        And with a database of thousands of mouth-watering recipes, you'll never get bored with your meals.
                        With Tastyplan, meal planning has never been easier or more delicious. Try Tastyplan today and taste the future of meal planning!
                    </p>
                </div>
                <div className="flex justify-center h-[400px]">
                    <Image src={whatIsTasytPlanImg} alt="img" width={1000} height={1200} priority />
                </div>
            </div>
        </div>
    );
}
