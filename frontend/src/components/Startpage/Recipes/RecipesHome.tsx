import styles from './RecipesHome.module.scss';

function RecipesHome() {
    return (
        <div className={styles.recipes}>
            <div className="bg-green-custom1 pt-20 lg:pb-20 mx-[-3.5rem]">
                <div className="mx-14 lg:flex">
                    <div className="lg:w-1/3">
                        <h2 className="leading-none mb-2">Simple and Tasty Recipes</h2>
                        <p>
                            - Indulge in a world of culinary delight, where visually captivating recipes take center
                            stage while remaining simple.
                        </p>
                    </div>
                    <div className="grid grid-cols-[repeat(5,1fr)] grid-rows-[repeat(4,1fr)] gap-x-0 gap-y-0 h-[600px] w-full justify-center items-center mt-[-20%] mr-auto mb-0 ml-auto sm:mt-0 lg:w-[600px] 2xl:h-[1000px]">
                        <div className={`hover:scale-105 ${styles.mainImage}`}></div>
                        <div
                            className={`hover:scale-105 w-[80px] h-[80px] bg-cover rounded=[50%] mt-[-300px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] mt-[-150px] 2xl:w-[200px] 2xl:h-[200px] 2xl:mt-[-180px] ${styles.topLeft}`}
                        ></div>
                        <div
                            className={`hover:scale-105 w-[80px] h-[80px] bg-cover rounded=[50%] mt-[-300px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] mt-[-150px] 2xl:w-[200px] 2xl:h-[200px] 2xl:mt-[-180px] ${styles.topRight}`}
                        ></div>
                        <div
                            className={`hover:scale-105 w-[80px] h-[80px] bg-cover rounded=[50%] mt-[-300px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] mt-[-150px] 2xl:w-[200px] 2xl:h-[200px] 2xl:mt-[-180px] ${styles.bottomLeft}`}
                        ></div>
                        <div
                            className={`hover:scale-105 w-[80px] h-[80px] bg-cover rounded=[50%] mt-[-300px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] mt-[-150px] 2xl:w-[200px] 2xl:h-[200px] 2xl:mt-[-180px] ${styles.bottomRight}`}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipesHome;
