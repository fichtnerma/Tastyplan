import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Icon from '@components/Icon/Icon';
import insta from '../../../public/Icons/instagram_icon.png';

function AboutUs() {
    const router = useRouter();
    return (
        <div className="p-6 md:p-14 md:pt-36">
            <button type="button" onClick={() => router.back()}>
                <Icon size={80} icon="arrowBack"></Icon>
            </button>
            <h1>About us</h1>

            <div className="lg:w-2/3">
                <p className="mb-5">
                    Welcome to Tastyplan! As five students who struggle with creating a weekly meal plan consisting of
                    tasty, quick and easy recipes, we were determined to simplify the process. No longer facing the
                    hassle of contemplating what required groceries to buy. The solution: TastyPlan. Say goodbye to the
                    stress of figuring out what to cook each week and enjoy the convenience of a personalized meal plan.
                </p>

                <p className="mb-5">
                    Our goal is to tackle the challenges of meal planning and help people effortlessly enjoy healthy and
                    delicious meals. Powered by artificial intelligence, Tastyplan offers personalized and flexible meal
                    planning tailored to individual preferences, allergies, and schedules. With our extensive database
                    of mouth-watering recipes, you'll never run out of inspiration. Our application also creates a
                    shopping list, which can be categorized into food groups to shop most efficiently. TastyPlan
                    supports its users throughout the entire process, from planning over shopping to cooking diverse and
                    simple recipes.
                </p>
                <p className="mb-5">
                    Combining our passion for technology and culinary arts, we are thrilled to create an intuitive and
                    practical platform with Tastyplan. Our aim is to simplify the meal planning process and provide a
                    seamless user experience. We hope that Tastyplan will alleviate the stress of meal planning while
                    opening up a world of culinary possibilities.
                </p>
                <p className="mb-5">
                    We invite you to try out Tastyplan and join us in the journey of transforming meal planning into an
                    easy and delightful experience. Together, let's conquer the question of what to eat and savor every
                    bite!
                </p>
            </div>

            <div>
                <h4>Meet the Team</h4>
                <p className="italic mb-5">Idea, Concept and Development</p>
                <p>Markus Fichtner</p>
                <p>Carolin Doht</p>
                <p>Manuel Proß</p>
                <p>Tabea Schaeffer</p>
                <p>Hannes Eckelt</p>

                <div className="flex mt-10">
                    <p>Follow us on Instagram</p>
                    <a className="ml-5 self-center" href="https://www.instagram.com/tasty.plan/">
                        <Image src={insta} className="pr-1" alt="instagram" width={50} />
                    </a>
                </div>

                <p className="mt-5">
                    <strong>Email:</strong> contact@tastyplan.de
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
