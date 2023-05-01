import Image from 'next/image';
import { Benefit } from '@pages/index';

type BenefitsProps = {
    benefits: Benefit[];
};

function Benefits({ benefits }: BenefitsProps) {
    return (
        <div className="flex justify-between">
            {benefits.map((benefit) => (
                <div key={benefit.id}>
                    <Image className="my-0 mx-auto" src={benefit.icon} alt="icon" width={200} height={200}></Image>
                    <h5 className="h5-green-dark mb-8">{benefit.heading}</h5>
                    <p>{benefit.desc}</p>
                </div>
            ))}
        </div>
    );
}

export default Benefits;
