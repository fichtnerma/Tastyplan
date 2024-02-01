import ShowRecipes from './ShowRecipes';

function RecipesHome() {
    return (
        <div className=" ">
            <div className="bg-green-custom1 py-20 mx-[-3.5rem]">
                <div className="w-full max-w-[1600px] ml-auto mr-auto">
                    <div className="mx-14 lg:flex ">
                        <div className="lg:w-1/3">
                            <h2 className="leading-none mb-2" data-cy="recipes-home-heading">
                                Simple and Tasty Recipes
                            </h2>
                            <p data-cy="recipes-home-desc">
                                - Indulge in a world of culinary delight, where visually captivating recipes take center
                                stage while remaining simple.
                            </p>
                        </div>
                    </div>
                    <div className=" flex lg:justify-center mt-10 overflow-x-scroll lg:overflow-visible w-[calc(100vw-5rem)] ml-16">
                        <ShowRecipes />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipesHome;
