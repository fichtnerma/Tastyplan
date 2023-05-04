import Image from 'next/image';

export type Benefit = {
    id: number;
    icon: string;
    heading: string;
    desc: string;
};

function Benefits() {
    const benefits: Benefit[] = [
        {
            id: 1,
            icon: '/Icons/Ei.svg',
            heading: 'Saves time and money',
            desc: 'by allowing for efficient grocery shopping and reducing food waste.',
        },
        {
            id: 2,
            icon: '/Icons/Ei.svg',
            heading: 'Promotes healthier eating habits',
            desc: 'by encouraging the consumption of a balanced and varied diet that meets nutritional needs and supports overall health.',
        },
        {
            id: 3,
            icon: '/Icons/Ei.svg',
            heading: 'Reduces food waste',
            desc: 'by helping you purchase only the necessary ingredients and use up items before they expire.',
        },
        {
            id: 4,
            icon: '/Icons/Ei.svg',
            heading: 'Reduces stress and decision fatigue',
            desc: 'by eliminating the need to constantly think about what to eat and simplifying mealtime preparation.',
        },
    ];
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
