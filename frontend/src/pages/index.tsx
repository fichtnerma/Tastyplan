import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg';

export default function index() {
    return (
        <div className="w-screen">
            <div className="flex justify-center pt-[120px] h-[400px]">
                <Image src={logo} alt="logo" width={400} height={239} priority />
            </div>
            <h1 className="text-center mb-5 mt-20">Tasty Plan</h1>
            <p className='text-center'>Das ist die Kochapp die du brauchst und </p>
            <p className='text-center mb-20'>die alles in deinem Leben verbessert</p>
            <div className="flex justify-center">
                <Link href="/authentication/registration">
                    <button className="btn-primary w-1/2  border-2 border-solid border-gray-custom1 rounded-full">
                        <h4 className="text-gray-custom1 px-[30px]">Start Planning</h4>
                    </button>
                </Link>
            </div>
            <div className='my-40'>
                <h2>What is Tasty Plan?</h2>
                <p className='w-2/3'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                    est Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    );
}
