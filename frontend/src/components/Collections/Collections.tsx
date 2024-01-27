'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Collections() {
    return (
        <>
            <h2 className="h4">Your collections</h2>
            <div className="md:flex gap-12">
                <Link
                    className="mb-5 md:mb-0 relative flex justify-center flex-col rounded-custom_s  w-full h-[225px] sm:h-[160px] md:!h-[300px] md:!w-[400px] bg-green-custom4 items-center hover:bg-green-custom_super_light text-green-custom2 hover:text-green-custom3"
                    href="/cookbook/ownRecipes"
                >
                    <Image
                        src="/RecipeStockImage.jpg"
                        width={200}
                        height={200}
                        alt="Food Img"
                        className={`w-full h-full object-cover rounded-custom_s opacity-10 transition-opacity duration-600 ease-in-out`}
                    />
                    <h3 className="text-inherit pt-5 m-0 absolute">Your Recipes</h3>
                </Link>

                <Link
                    className="flex justify-center flex-col rounded-custom_s relative w-full h-[225px] sm:h-[160px] md:!h-[300px] md:!w-[400px] bg-green-custom4 items-center hover:bg-green-custom_super_light text-green-custom2 hover:text-green-custom3"
                    href="/cookbook/favorites"
                >
                    <Image
                        src="/RecipeStockImage.jpg"
                        width={200}
                        height={200}
                        alt="Food Img"
                        className={`w-full h-full object-cover rounded-custom_s opacity-10 transition-opacity duration-600 ease-in-out`}
                    />
                    <h3 className="text-inherit pt-5 m-0 absolute">Your Favorites</h3>
                </Link>
            </div>
        </>
    );
}

export default Collections;
