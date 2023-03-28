import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.svg';

export default function index() {
    return (
        <div className="h-screen w-screen fixed">
            <div className="flex justify-center pt-[120px] h-[400px]">
                <Image src={logo} alt="logo" width={400} height={239} priority />
            </div>
            <h2 className="text-center my-20">Los gehts!</h2>
            <div className="flex justify-center">
                <Link href="/preferences">
                    <button className="px-[60px] py-[10px] border-2 border-solid border-gray-custom1 rounded-full hover:bg-green-custom1">
                        <h4 className="text-gray-custom1">Start Planning</h4>
                    </button>
                </Link>
            </div>
        </div>
    );
}
