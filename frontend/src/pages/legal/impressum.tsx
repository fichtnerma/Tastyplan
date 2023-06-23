import React from 'react';
import { useRouter } from 'next/router';
import Icon from '@components/Icon/Icon';

function impressum() {
    const router = useRouter();
    return (
        <div className="lg:w-3/6 p-6 md:p-14 md:pt-36">
            <button type="button" onClick={() => router.back()}>
                <Icon size={80} icon="arrowBack"></Icon>
            </button>
            <h1>Imprint</h1>

            <p className="italic mb-10">
                Information obligation according to §5 E-Commerce Law, §14 Corporate Code, §63 Trade Regulations and
                disclosure obligation according to §25 Media Act.
            </p>

            <div className="mb-10">
                <h4>University of Applied Sciences Salzburg</h4>
                <p>Urstein Süd 3</p>
                <p>5412 Puch bei Hallein, Austria</p>
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

export default impressum;
