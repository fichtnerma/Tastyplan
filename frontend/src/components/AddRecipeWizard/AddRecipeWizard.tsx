import { useState } from 'react';
import { Ingredient } from 'src/types/types';
import Keyfacts from './Steps/Keyfacts';
import AddSteps, { CustomStep } from './Steps/AddSteps';
import AddNameAndImage from './Steps/AddNameAndImage';
import AddIngredients from './Steps/AddIngredients';

type CustomRecipe = {
    name: string;
    imageFile: File | undefined;
    cookingTime: number;
    servings: number;
    foodLifestyle: string;
    steps: CustomStep[];
};

type AddRecipeWizardProps = {
    stepNr: number;
};

const AddRecipeWizard = ({ stepNr }: AddRecipeWizardProps) => {
    const [customRecipe, setCustomeRecipe] = useState<CustomRecipe>({
        name: '',
        imageFile: undefined,
        cookingTime: 10,
        servings: 1,
        foodLifestyle: 'vegetarian',
        steps: [],
    });

    const handleNameChange = (name: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.name = name;
        setCustomeRecipe(currentRecipe);
    };

    const onUploadedImgChange = (img: File) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.imageFile = img;
        setCustomeRecipe(currentRecipe);
    };

    const handleCookingTimeChange = (time: number) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.cookingTime = time;
        setCustomeRecipe(currentRecipe);
    };

    const handleServingsChange = (servings: number) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.servings = servings;
        setCustomeRecipe(currentRecipe);
    };

    const handleFoodLifestyleChange = (foodLifestyle: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.foodLifestyle = foodLifestyle;
        setCustomeRecipe(currentRecipe);
    };

    const handleAddIngredient = (ingredients: Ingredient[]) => {
        console.log('add ingredient');
    };

    const handleAddSteps = (steps: CustomStep[]) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.steps = steps;
        setCustomeRecipe(currentRecipe);
    };

    const renderStep = (stepNumber: number) => {
        switch (stepNumber) {
            case 2:
                return (
                    <Keyfacts
                        onCookingTime={handleCookingTimeChange}
                        onServings={handleServingsChange}
                        onFoodLifestyle={handleFoodLifestyleChange}
                    />
                );
            case 3:
                return <AddIngredients onAddIngredient={handleAddIngredient} />;
            case 4:
                return <AddSteps onAddSteps={handleAddSteps} />;
            default:
                return <AddNameAndImage onNameChange={handleNameChange} onUploadedImgChange={onUploadedImgChange} />;
        }
    };

    return <form>{renderStep(stepNr)}</form>;
};

export default AddRecipeWizard;
