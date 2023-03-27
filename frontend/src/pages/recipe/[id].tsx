import styles from '../../styles/DetailRecipe.module.scss';

import pancakes from '../../../public/pancakes.jpg';
import timeIcon from '../../../public/Icons/time.svg';
import kochIcon from '../../../public/Icons/kochmutze.png';
import potIcon from '../../../public/Icons/topf.png';
import vegetarianIcon from '../../../public/Icons/vegetarian.png';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DetailRecipe() {
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
    return (
        <>{!loading ? (
            <div className={styles.container} >
                <div className={styles.recipeBox}>
                    <Image src={pancakes} alt={'Pancakes Bild'} className={styles.foodImg}></Image>
                    <div className='ml-5'>
                        <h1 className={styles.titleRecipe}>{recipe.name}</h1>
                        <div className='grid grid-cols-2'>
                            <div>
                                <div className='flex'>
                                    <div className='flex flex-col m-6'>
                                        <Image src={kochIcon} className='self-center mb-2' alt="Time Icon" width={60} height={60} priority />
                                        <h5 className='text-center'>{recipe.difficulty}</h5>
                                    </div>
                                    <div className='flex flex-col m-6'>
                                        <Image src={vegetarianIcon} className='self-center mb-2' alt="Time Icon" width={60} height={60} priority />
                                        <h5 className='text-center'>{recipe.formOfDiet}</h5>
                                    </div>
                                    <div className='flex flex-col m-6'>
                                        <Image src={timeIcon} className='self-center mb-2' alt="Time Icon" width={60} height={60} priority />
                                        <h5 className='text-center'>{recipe.preparingTime} min</h5>
                                    </div>
                                    <div className='flex flex-col m-6'>
                                        <Image src={potIcon} className='self-center mb-2' alt="Time Icon" width={60} height={60} priority />
                                        <h5 className='text-center'>{recipe.cookingTime} min</h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h4>Ingridients:</h4>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            {ingredientsSplited?.firstHalf.map((ingredient) => (
                                                <div className='grid grid-cols-3 gap-5'>
                                                    <p className='text-right '>{ingredient.amount}</p>
                                                    <p className='text-left col-span2'>{ingredient.ingredient}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            {ingredientsSplited?.secondHalf.map((ingredient) => (
                                                <div className='grid grid-cols-3 gap-5'>
                                                    <p className='text-right '>{ingredient.amount}</p>
                                                    <p className='text-left col-span2'>{ingredient.ingredient}</p>
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
                        <div className='mt-10'>
                            <h3>The Recipe</h3>
                            <div>
                                {recipe?.steps?.map((step: any) => (
                                    <div className='m-10'>
                                        <h4>Step {step.stepCount}:</h4>
                                        <Image src={pancakes} alt={'Pancakes Bild'} className={styles.stepImg}></Image>
                                        <p className={styles.recipeText}>{step.description}</p>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <div className='mt-40 pb-40'>
                            <h3 className='text-center text-green-custom2'>Well done!</h3>
                            <p className='text-center'>How do you rate the recipe?</p>
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
