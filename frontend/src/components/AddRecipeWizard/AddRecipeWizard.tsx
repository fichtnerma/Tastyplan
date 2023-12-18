import { useState } from 'react';
import { Ingredient } from 'src/types/types';
import Keyfacts from './Steps/Keyfacts';
import AddSteps, { CustomStep } from './Steps/AddSteps';
import AddNameAndImage from './Steps/AddNameAndImage';
import AddIngredients from './Steps/AddIngredients';

export type CustomRecipe = {
    name: string;
    image: string | undefined;
    ingredients: Ingredient[];
    totalTime: number;
    servings: number;
    formOfDiet: string;
    steps: CustomStep[];
};

type AddRecipeWizardProps = {
    stepNr: number;
    onNewRecipe: (recipe: CustomRecipe) => void;
};

const AddRecipeWizard = ({ stepNr, onNewRecipe }: AddRecipeWizardProps) => {
    const [customRecipe, setCustomeRecipe] = useState<CustomRecipe>({
        name: '',
        image: undefined,
        ingredients: [],
        totalTime: 10,
        servings: 1,
        formOfDiet: 'vegetarian',
        steps: [],
    });

    const handleNameChange = (name: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.name = name;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const onUploadedImgChange = (img: string | undefined) => {
        if (!img) return;

        const currentRecipe = { ...customRecipe };
        currentRecipe.image = img;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleTotalTimeChange = (time: number) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.totalTime = time;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleServingsChange = (servings: number) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.servings = servings;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleFoodLifestyleChange = (foodLifestyle: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.formOfDiet = foodLifestyle;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleAddIngredient = (ingredient: Ingredient) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.ingredients.push(ingredient);
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleAddSteps = (steps: CustomStep[]) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.steps = steps;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const renderStep = (stepNumber: number) => {
        switch (stepNumber) {
            case 2:
                return (
                    <Keyfacts
                        currentTotalTime={customRecipe.totalTime}
                        currentServings={customRecipe.servings}
                        currentSelectedOption={{
                            label: customRecipe.formOfDiet.charAt(0).toUpperCase() + customRecipe.formOfDiet.slice(1),
                            value: customRecipe.formOfDiet.toLowerCase(),
                        }}
                        onTotalTime={handleTotalTimeChange}
                        onServings={handleServingsChange}
                        onFoodLifestyle={handleFoodLifestyleChange}
                    />
                );
            case 3:
                return <AddIngredients onAddIngredient={handleAddIngredient} />;
            case 4:
                return <AddSteps onAddSteps={handleAddSteps} />;
            default:
                return (
                    <AddNameAndImage
                        currentName={customRecipe.name}
                        currentImage={customRecipe.image}
                        onNameChange={handleNameChange}
                        onUploadedImgChange={onUploadedImgChange}
                    />
                );
        }
    };

    return <form>{renderStep(stepNr)}</form>;
};

export default AddRecipeWizard;
