import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Icon from '@components/Icon/Icon';
import { fetchWithAuth } from '@helpers/utils';
import { useSwitchRecipeContext } from '@hooks/useSwitchRecipeContext';
import { Recipe } from 'src/types/types';

export default function DetailView({
    useAuthSession = useSession,
    useSwitchRecipe = useSwitchRecipeContext,
}: {
    useAuthSession: typeof useSession;
    useSwitchRecipe: typeof useSwitchRecipeContext;
}) {
    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { currentRecipeId, switchRecipe, hideDetailView } = useSwitchRecipe()!;
    const { data: session } = useAuthSession();
    useEffect(() => {
        async function fetchRecipe() {
            const recipeRes = await fetchWithAuth(`/service/recipes/${currentRecipeId}`, { method: 'GET' }, session);
            let recipe: Recipe | undefined = undefined;
            try {
                recipe = await recipeRes.json();
            } catch (e) {}
            setRecipe(recipe);
        }
        if (currentRecipeId) {
            fetchRecipe();
        }
    }, [currentRecipeId, session]);
    return (
        <>
            <button
                className="h-fit w-fit absolute"
                onClick={hideDetailView}
                aria-label="go back"
                onKeyDown={(e) => {
                    if (('key' in e && e.key === 'Tab') || ('key' in e && e.key === 'Shift')) return;
                    hideDetailView;
                }}
            >
                <Icon classNames="inline-flex mr-2" size={16} icon="arrowBack" />
                Back
            </button>
            {recipe && (
                <section className=" w-full h-full overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:flex:row gap-6">
                        <div className="w-full sm:w-1/2">
                            <div className="h-96 w-full relative overflow-hidden rounded-[30px]">
                                <Image
                                    src={`/service/images/${recipe.img}`}
                                    alt={'Pancakes Bild'}
                                    fill
                                    layout="cover"
                                    objectFit="cover"
                                    priority
                                />
                                <div className="absolute block pb-4 text-white-custom pt-9 sm:hidden bottom-0 w-full h-fit bg-gradient-to-t from-[var(--green-dark)]">
                                    <span className="h2 pl-5  w-full z-30">{recipe.name}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-3">
                                {recipe.totalTime ? (
                                    <span className="badge badge-sm">
                                        <Icon classNames="inline-block mr-2" size={18} icon="totaltime" />
                                        {recipe.totalTime} min
                                    </span>
                                ) : null}
                                {recipe.cookingTime ? (
                                    <span className="badge badge-sm">
                                        <Icon classNames="inline-block mr-2" size={18} icon="cookingTime" />
                                        {recipe.cookingTime} min
                                    </span>
                                ) : null}
                                {recipe.preparingTime ? (
                                    <span className="badge badge-sm">
                                        <Icon classNames="inline-block mr-2" size={18} icon="preparingTime" />
                                        {recipe.preparingTime} min
                                    </span>
                                ) : null}
                                <span className="badge badge-sm capitalize">
                                    <Icon classNames="inline-block mr-2" size={18} icon={recipe.formOfDiet} />
                                    {recipe.formOfDiet}
                                </span>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <span className="h3 hidden sm:block">{recipe.name}</span>
                            <ul className="flex-col gap-2 px-2">
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient.id} className="customItem flex gap-2">
                                        <span className="capitalize">{ingredient?.ingredient?.name}</span>
                                        <span>
                                            {ingredient.quantity} {ingredient.unit}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="h3">Instructions</span>
                        {recipe.steps.map((step) => (
                            <div className="flex items-center mb-3" key={step.description}>
                                <span className="bg-green-custom2 inline-flex justify-center mr-3 rounded-full font-bold w-7 h-7 text-white-custom">
                                    {step.stepCount}
                                </span>
                                <span className="inline-block w-full sm:w-3/4">{step.description}</span>
                            </div>
                        ))}
                        <div className="pb-6" />
                    </div>
                </section>
            )}
            <div className="w-full absolute bottom-5 right-5 bg-transparent flex justify-center">
                <button
                    className="text-white-custom py-1 text-sm rounded-md px-2 hover:bg-green-custom3 hover:border-green-custom3 bg-green-custom2 border-green-custom2 w-fit border shadow-md"
                    onClick={() => switchRecipe(currentRecipeId)}
                >
                    <Icon classNames="inline-flex mr-2" size={16} icon="check" />
                    <span className="text-white-custom">Choose for Swap</span>
                </button>
            </div>
        </>
    );
}
