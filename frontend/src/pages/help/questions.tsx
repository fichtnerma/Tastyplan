import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Help.module.scss';
import insta from '../../../public/Icons/instagram_icon.png';

function questions() {
    return (
        <div className={`p-6 md:p-14 md:pt-36 lg:w-4/5 ${styles.questions}`}>
            <h1>Questions & Answers</h1>
            <div className="mb-10">
                <h3>How does Tastyplan help in saving time and money?</h3>
                <ol>
                    <li>
                        Efficient Meal Planning: Tastyplan's AI-powered system generates personalized meal plans based
                        on your preferences and schedule. This eliminates the need to spend time thinking about what to
                        eat and planning meals manually.
                    </li>
                    <li>
                        Smart Ingredient Usage: Tastyplan suggests recipes that utilize common ingredients across
                        multiple meals, reducing the need for buying excessive or specialized items. This minimizes food
                        waste and saves money on grocery bills.
                    </li>
                    <li>
                        Generated Shopping List: Tastyplan automatically generates a shopping list based on your
                        selected recipes. This ensures you only purchase the necessary ingredients, preventing impulsive
                        buying and further saving you time and money.
                    </li>
                </ol>
            </div>
            <div className="mb-10">
                <h3>Is Tastyplan available as a mobile app as well?</h3>
                <p>
                    Yes, Tastyplan will soon be available as a mobile app, bringing the convenience of meal planning
                    right to your fingertips. Stay tuned for updates as we are actively working on developing the mobile
                    app to enhance your Tastyplan experience on the go.
                </p>
            </div>
            <div className="mb-10">
                <h3>Can I integrate my own recipes into Tastyplan?</h3>
                <p>
                    Absolutely! We understand the importance of having your own favorite recipes in your meal planning.
                    We're excited to announce that soon you will be able to seamlessly integrate your own recipes into
                    Tastyplan. Stay tuned for updates as we are actively working on bringing this feature to our
                    platform, allowing you to personalize your meal plans with your beloved homemade creations.
                </p>
            </div>
            <div className="mb-10">
                <h3>Who are we? Who is behind Tasytplan?</h3>
                <p>
                    We are a dedicated team of five students pursuing our Master's degree in Multimedia Technology at
                    the University of Salzburg. As part of our Master's project, we embarked on a mission to
                    revolutionize meal planning. Faced with our own constant struggle of deciding what to eat, we
                    created Tastyplan.
                </p>
                <Link href="/company/aboutUs" className="underline underline-offset-8">
                    <p>Learn more about us</p>
                </Link>
            </div>
            <div className="mb-10">
                <h3>Want to stick around and stay updated?</h3>
                <div className="flex">
                    <p>Follow us on Instagram</p>
                    <a className="ml-5 self-center" href="https://www.instagram.com/tasty.plan/">
                        <Image src={insta} className="pr-1" alt="instagram" width={50} />
                    </a>
                </div>
            </div>
            <div className="mb-10">
                <h3>What is the best way to contact us?</h3>
                <p>Feel free to send us an email at contact@tastyplan.de</p>
            </div>
        </div>
    );
}

export default questions;
