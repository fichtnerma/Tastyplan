import styles from '../../styles/DetailRecipe.module.scss';

import pancakes from '../../../public/pancakes.jpg';
import timeIcon from '../../../public/Icons/time.svg';
import kochIcon from '../../../public/Icons/kochmutze.png';
import potIcon from '../../../public/Icons/topf.png';
import vegetarianIcon from '../../../public/Icons/vegetarian.png';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function detailRecipe() {
    const router = useRouter();

    const [loading, setLoading] = useState(true)
    const [recipe, setRecipe] = useState<any>({})

    const id = router.query.id

    useEffect(() => {

        fetch(`http://localhost:3000/recipes/${id}`)
            .then(data => data.json())
            .then((data) => {
                setRecipe(data)
                setLoading(false)
            })
    }, [loading])

    const ingredientsSplited = spiltSteps(recipe?.ingredients, 5);
    const recipes = spiltSteps(recipe?.steps, 3);
    return (
        <>{!loading ? (
            <div className={styles.container} >
                <div className={styles.recipeBox}>
                    <Image src={pancakes} alt={'Pancakes Bild'} className={styles.foodImg}></Image>
                    <div className='ml-5'>
                        <h3 className={styles.titleRecipe}>{recipe.name}</h3>
                        <div className='grid grid-cols-2'>
                            <div>
                                <div className='flex'>
                                    <div className='flex flex-col m-6'>
                                        <Image src={kochIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                        <p className='text-base text-center'>{recipe.difficulty}</p>
                                    </div>
                                    <div className='flex flex-col m-6'>
                                        <Image src={vegetarianIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                        <p className='text-base text-center'>{recipe.formOfDiet}</p>
                                    </div>
                                    <div className='flex flex-col m-6'>
                                        <Image src={timeIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                        <p className='text-base text-center'>{recipe.preparingTime} min</p>
                                    </div>
                                    <div className='flex flex-col m-6'>
                                        <Image src={potIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                        <p className='text-base text-center'>{recipe.cookingTime} min</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>Zutaten:</h4>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            {ingredientsSplited?.firstHalf.map((ingredient) => (
                                                <div className='flex'>
                                                    <input type='checkbox' className={styles.checkbox}></input>
                                                    <label>{`${ingredient.amount} ${ingredient.ingredient}`}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            {ingredientsSplited?.secondHalf.map((ingredient) => (
                                                <div className='flex'>
                                                    <input type='checkbox' className={styles.checkbox} />
                                                    <label>{`${ingredient.amount} ${ingredient.ingredient}`}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                <p>Gewürze:</p>
                                {spieces.map((spiece) => (
                                    <div className='flex'>
                                        <input type='checkbox' className='mr-2' />
                                        <p>{spiece}</p>
                                    </div>
                                ))}
                            </div> */}
                            </div>
                        </div>
                        <div>
                            <h3>Das Rezept</h3>
                            <div className='grid grid-cols-2'>
                                <div>
                                    {recipes?.firstHalf.map((step) => (
                                        <div className='flex gap-x-4 m-5'>
                                            <div className={styles.numberFrame}>
                                                <p className='text-4xl'>{step.stepCount}</p>
                                            </div>
                                            <p className={styles.recipeText}>{step.description}</p>
                                        </div>

                                    ))}
                                </div>
                                <div>
                                    {recipes?.secondHalf.map((step, index) => (
                                        <div className='flex gap-x-4 m-5'>
                                            <div className={styles.numberFrame}>
                                                <p className='text-4xl'>{step.stepCount}</p>
                                            </div>
                                            <p className={styles.recipeText}>{step.description}</p>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
            : (<div>loading</div>)
        }</>)
}

function spiltSteps(list: any[] | null, cut: number) {
    if (!list) {
        return
    }
    let firstHalf = [];
    let secondHalf: any[] = [];
    if (list.length > cut) {
        const half = Math.ceil(list.length / 2);

        firstHalf = list.slice(0, half)
        secondHalf = list.slice(half)
        return { firstHalf, secondHalf };
    }

    firstHalf = list
    console.log(firstHalf)
    return { firstHalf, secondHalf };
}
