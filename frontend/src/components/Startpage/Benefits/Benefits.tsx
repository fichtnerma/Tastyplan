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
            icon: '/Icons/time-is-money.svg',
            heading: 'Saves time and money',
            desc: 'by allowing for efficient grocery shopping and reducing food waste.',
        },
        {
            id: 2,
            icon: '/Icons/promotion.svg',
            heading: 'Promotes healthier eating habits',
            desc: 'by encouraging the consumption of a balanced and varied diet that meets nutritional needs and supports overall health.',
        },
        {
            id: 3,
            icon: '/Icons/food-waste.svg',
            heading: 'Reduces food waste',
            desc: 'by helping you purchase only the necessary ingredients and use up items before they expire.',
        },
        {
            id: 4,
            icon: '/Icons/reduceChart.svg',
            heading: 'Reduces stress and decision fatigue',
            desc: 'by eliminating the need to constantly think about what to eat and simplifying mealtime preparation.',
        },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gird-rows-1 sm:grid-rows-2 lg:grid-rows-1 gab-4 w-full">
            {benefits.map((benefit) => (
                <div key={benefit.id} className=" p-2 rounded-2xl pb-10 lg:pb-0">
                    <h3 className="h4 text-green-custom2 mb-8 h-8 lg:h-28">{benefit.heading}</h3>
                    <Image
                        className="mb-2 lg:mb-10 mx-auto h-[80px] lg:h-[120px] w-[80px] lg:w-[120px]"
                        src={benefit.icon}
                        alt="icon"
                        width={120}
                        height={120}
                        loading="lazy"
                    />
                    <p className="">{benefit.desc}</p>
                </div>
            ))}
        </div>
    );
}

export default Benefits;
