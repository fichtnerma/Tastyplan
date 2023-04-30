import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import IngredientList from '@components/IngredientList/IngredientList';
import Icon from '@components/Icon/Icon';
import { getFormOfDietIcon } from '@helpers/utils';
import { Recipe, Step } from 'src/types/types';
import styles from '../../styles/DetailRecipe.module.scss';

export default function DetailRecipe() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState<Recipe>();

    const id = router.query.id;

    useEffect(() => {
        fetch(`http://localhost:3000/recipes/${id}`)
            .then((data) => data.json())
            .then((data) => {
                setRecipe(data);
                setLoading(false);
            });
    }, [loading, id]);

    return (
        <>
            {!loading ? (
                <div className={styles.container}>
                    <div className={styles.recipeBox}>
                        <Image
                            src={`http://localhost:3000/images/${recipe?.img}`}
                            alt={'Pancakes Bild'}
                            className={styles.foodImg}
                        />
                        <div className="ml-5">
                            <h1 className={styles.titleRecipe}>{recipe?.name}</h1>
                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="flex">
                                        <div className="flex flex-col m-6">
                                            <Image
                                                src={getFormOfDietIcon(recipe?.formOfDiet)}
                                                className="self-center mb-2"
                                                alt="Time Icon"
                                                width={40}
                                                height={40}
                                                priority
                                            />
                                            <h5 className="text-center">{recipe?.formOfDiet}</h5>
                                        </div>
                                        <div className="flex flex-col m-6">
                                            <Image
                                                src={'/Icons/time.svg'}
                                                className="self-center mb-2"
                                                alt="Time Icon"
                                                width={40}
                                                height={40}
                                                priority
                                            />
                                            <h5 className="text-center">{recipe?.preparingTime} min</h5>
                                        </div>
                                        <div className="flex flex-col m-6">
                                            <Image
                                                src={'/Icons/topf.png'}
                                                className="self-center mb-2"
                                                alt="Time Icon"
                                                width={40}
                                                height={40}
                                                priority
                                            />
                                            <h5 className="text-center">{recipe?.cookingTime} min</h5>
                                        </div>
                                    </div>
                                </div>
                                <IngredientList ingredients={recipe?.ingredients} />
                            </div>
                            <div className="mt-10">
                                <h3 className="text-green-custom2">The Recipe</h3>
                                <div>
                                    {recipe?.steps?.map((step: Step) =>
                                        step.stepCount % 2 == 0 ? (
                                            <div key={step.stepCount} className="my-10">
                                                <h4>Step {step.stepCount}:</h4>
                                                <div className="flex gap-20">
                                                    <p className={` ${styles.recipeText}`}>{step.description}</p>
                                                    <Image
                                                        src={'/Icons/carbonara.png'}
                                                        alt={'Pancakes Bild'}
                                                        width={400}
                                                        height={300}
                                                        className={styles.stepImg}
                                                    ></Image>
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={step.stepCount} className="my-10">
                                                <h4>Step {step.stepCount}:</h4>
                                                <div className="flex gap-20">
                                                    <Image
                                                        src={'/Icons/carbonara.png'}
                                                        alt={'Pancakes Bild'}
                                                        width={400}
                                                        height={300}
                                                        className={styles.stepImg}
                                                    />
                                                    <p className={styles.recipeText}>{step.description}</p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                            <div className="mt-40 pb-40">
                                <h3 className="text-center text-green-custom2">Well done!</h3>
                                <p className="text-center">How do you rate the recipe?</p>
                                <div className="flex justify-center mt-5">
                                    {Array.from(Array(5), (index) => (
                                        <Icon key={index} size={24} icon="star" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>loading</div>
            )}
        </>
    );
}
