import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.svg';

export default function index() {
    return (
        <div className="h-screen w-screen">
            <div className="flex justify-center pt-[120px] h-[400px]">
                <Image src={logo} alt="logo" width={400} height={239} priority />
            </div>
            <h2 className="text-center my-20">Los gehts!</h2>
            <div className="flex justify-center">
                <Link href="/registration">
                    <button className="btn-submit w-1/2  border-2 border-solid border-gray-custom1 rounded-full">
                        <h4 className="text-gray-custom1 px-[30px]">Start Planning</h4>
                    </button>
                </Link>
            </div>
        </div>
    );
}
