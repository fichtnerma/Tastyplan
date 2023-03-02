import styles from '../../styles/DetailRecipe.module.scss';
import Image from 'next/image';
import pancakes from '../../../public/pancakes.jpg';
import timeIcon from '../../../public/Icons/time.svg';
import kochIcon from '../../../public/Icons/kochmutze.png';
import vegetarianIcon from '../../../public/Icons/vegetarian.png';
import { validateConfig } from 'next/dist/server/config-shared';

const recipe = ["Mische die Sahne in einer Schüssel mit den Konfetti zusammen", "Mische die Sahne in einer Schüssel mit den Konfetti zusammen", "Mische die Kartoffeln in einer Schüssel mit den Konfetti zusammen", "Mische die Kartoffeln in einer Schüssel mit den Konfetti zusammen", "Mische die Kartoffeln in einer Schüssel mit den Konfetti zusammen"]

export default function detailRecipe() {
    const ingredients = ["Milch", "Reis", "Banane", "Senf", "Butter", "Öl", "Mais"];
    const spieces = ["Zimt", "Salz", "Pfeffer"];
    const ingredientsSplited = spiltSteps(ingredients, 5);
    const recipes = spiltSteps(recipe, 3);
    return (
        <div className={styles.container}>
            <div className={styles.recipeBox}>
                <Image src={pancakes} alt={'Pancakes Bild'} className={styles.foodImg}></Image>
                <div className='ml-5'>
                    <h3 className={styles.titleRecipe}>Pancakes mit Blaubeeren</h3>
                    <div className='grid grid-cols-2'>
                        <div>
                            <div className='flex'>
                                <div className='flex flex-col m-6'>
                                    <Image src={kochIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                    <p className='text-base text-center'>einfach</p>
                                </div>
                                <div className='flex flex-col m-6'>
                                    <Image src={vegetarianIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                    <p className='text-base text-center'>Vegetarisch</p>
                                </div>
                                <div className='flex flex-col m-6'>
                                    <Image src={timeIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                    <p className='text-base text-center'>Gesamtzeit</p>
                                    <p className='text-base text-center'>30 min</p>
                                </div>
                                <div className='flex flex-col m-6'>
                                    <Image src={timeIcon} className='self-center mb-2' alt="Time Icon" width={40} height={40} priority />
                                    <p className='text-base text-center'>Zubereitungszeit</p>
                                    <p className='text-base text-center'>10 min</p>
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
                                                <label>{ingredient}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {ingredientsSplited?.secondHalf.map((ingredient) => (
                                            <div className='flex'>
                                                <input type='checkbox' className={styles.checkbox} />
                                                <label>{ingredient}</label>
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
                                {recipes?.firstHalf.map((step, index) => (
                                    <div className='flex gap-x-4 m-5'>
                                        <div className={styles.numberFrame}>
                                            <p className='text-4xl'>{index + 1}</p>
                                        </div>
                                        <p className={styles.recipeText}>{step}</p>
                                    </div>

                                ))}
                            </div>
                            <div>
                                {recipes?.secondHalf.map((step, index) => (
                                    <div className='flex gap-x-4 m-5'>
                                        <div className={styles.numberFrame}>
                                            <p className='text-4xl'>{index + 1 + recipes?.firstHalf.length}</p>
                                        </div>
                                        <p className={styles.recipeText}>{step}</p>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

function spiltSteps(list: any[], cut: number) {
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
