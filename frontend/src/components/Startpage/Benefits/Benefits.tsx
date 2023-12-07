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
        <div className="flex h-fit md:min-h-[700px] lg:min-h-[900px] xl:min-h-[500px] overflow-x-scroll md:overflow-visible md:grid md:grid-cols-2 xl:grid-cols-4 md:grid-rows-2 xl:grid-rows-1 md:gap-4 md:w-full">
            {benefits.map((benefit) => (
                <div
                    key={benefit.id}
                    className="group basis-[200px] p-5 md:w-full grow-0 shrink-0 rounded-2xl md:h-[160px] lg:h-[240px] md:hover:h-[260px] lg:hover:h-[400px] bg-white-custom mr-5 md:mr-0 drop-shadow mt-[80px] transition-all ease-in-out duration-700"
                >
                    <div className="relative top-[-60px] drop-shadow w-[200px] md:w-full bg-green-custom_super_light p-5 rounded-2xl flex mx-auto z-10 h-fit">
                        <h3 className="h4 text-black !mb-0">{benefit.heading}</h3>
                        <Image
                            className="my-4 lg:mb-10 mt-10 mx-auto h-[80px] lg:h-[120px] w-[80px] lg:w-[120px]"
                            src={benefit.icon}
                            alt="icon"
                            width={120}
                            height={120}
                            loading="lazy"
                        />
                    </div>
                    <p className="leading-tight mt-[-40px] md:mt-[-130px] md:group-hover:mt-[-40px] md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 ease-in-out">
                        {benefit.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Benefits;
