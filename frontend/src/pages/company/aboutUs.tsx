import React from 'react';

function aboutUs() {
    return (
        <div className="p-6 lg:p-14">
            <h1>About us</h1>

            <div className="w-2/3">
                <p className="mb-5">
                    Welcome to Tastyplan! We are a dedicated team of five students pursuing our Master's degree in
                    Multimedia Technology at the University of Salzburg. As part of our Master's project, we embarked on
                    a mission to revolutionize meal planning. Faced with our own constant struggle of deciding what to
                    eat, we created Tastyplan.
                </p>

                <p className="mb-5">
                    Our goal is to tackle the challenges of meal planning and help people effortlessly enjoy healthy and
                    delicious meals. Powered by artificial intelligence, Tastyplan offers personalized and flexible meal
                    planning tailored to individual preferences, allergies, and schedules. With our extensive database
                    of mouth-watering recipes, you'll never run out of inspiration.
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

                <p className="mt-10">
                    <strong>Email:</strong> contact@tastyplan.de
                </p>
            </div>
        </div>
    );
}

export default aboutUs;
