'use client';
import React from 'react';
import Link from 'next/link';
import Icon from '@components/Icon/Icon';

function AddRecipeCard() {
    return (
        <>
            <Link
                className="flex justify-center rounded-custom_s relative !w-[150px] h-[225px] sm:h-[160px] md:!h-[300px] md:!w-[200px] bg-green-custom4 items-center hover:bg-green-custom_super_light text-green-custom2"
                href="/addRecipe"
                data-cy="add-own-recipe-link"
            >
                <span className="md:!w-[200px] !w-[150px] flex flex-col justify-center items-center">
                    <span>
                        <Icon size={50} icon="addCircle"></Icon>
                    </span>
                    <h5 className="text-inherit pt-5 m-0">add your</h5>
                    <h5 className="text-inherit m-0 leading-none">own recipe</h5>
                </span>
            </Link>
        </>
    );
}

export default AddRecipeCard;
