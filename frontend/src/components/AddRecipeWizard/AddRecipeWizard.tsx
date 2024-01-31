import { useEffect, useState } from 'react';
import useFetchWithAuth from '@hooks/fetchWithAuth';
import { Ingredient, Option } from 'src/types/types';
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
    tags: Option[];
    steps: CustomStep[];
};

type AddRecipeWizardProps = {
    stepNr: number;
    onNewRecipe: (recipe: CustomRecipe) => void;
    onInputisInvalid: (inpuIsInvalid: boolean) => void;
};

const AddRecipeWizard = ({ stepNr, onNewRecipe, onInputisInvalid }: AddRecipeWizardProps) => {
    const [customRecipe, setCustomeRecipe] = useState<CustomRecipe>({
        name: '',
        image: undefined,
        ingredients: [],
        totalTime: 10,
        servings: 1,
        formOfDiet: 'vegetarian',
        tags: [],
        steps: [],
    });
    const [nameIsValid, setNameIsValid] = useState(false);
    const [totalTimeIsValid, setTotalTimeIsValid] = useState(true);
    const [servingsAreValid, setServingsAreValid] = useState(true);
    const [formOfDietIsValid, setFormOfDietIsValid] = useState(true);
    const [ingredientsAreValid, setIngredientsAreValid] = useState(true);
    const [stepsAreValid, setStepsAreValid] = useState(true);

    useEffect(() => {
        if (
            nameIsValid &&
            totalTimeIsValid &&
            servingsAreValid &&
            formOfDietIsValid &&
            ingredientsAreValid &&
            stepsAreValid
        )
            onInputisInvalid(false);
        else onInputisInvalid(true);

        if (stepNr === 3 && customRecipe.ingredients.length === 0) onInputisInvalid(true);

        if (stepNr === 4 && customRecipe.steps.length === 0) onInputisInvalid(true);
    }, [
        customRecipe.ingredients.length,
        customRecipe.steps.length,
        formOfDietIsValid,
        ingredientsAreValid,
        nameIsValid,
        onInputisInvalid,
        servingsAreValid,
        stepNr,
        stepsAreValid,
        totalTimeIsValid,
    ]);

    const handleNameChange = (name: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.name = name;
        if (name.length > 0) setNameIsValid(true);
        else setNameIsValid(false);
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
        if (time > 0) setTotalTimeIsValid(true);
        else setTotalTimeIsValid(false);
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleServingsChange = (servings: number) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.servings = servings;
        if (servings > 0) setServingsAreValid(true);
        else setServingsAreValid(false);
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleFoodLifestyleChange = (foodLifestyle: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.formOfDiet = foodLifestyle;
        if (foodLifestyle.length > 0) setFormOfDietIsValid(true);
        else setFormOfDietIsValid(false);
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleTagsChange = (tags: Option[]) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.tags = tags;
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleAddIngredients = (ingredients: Ingredient[]) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.ingredients = [...ingredients];
        if (currentRecipe.ingredients.length > 0) setIngredientsAreValid(true);
        else setIngredientsAreValid(false);
        setCustomeRecipe(currentRecipe);
        onNewRecipe(currentRecipe);
    };

    const handleAddSteps = (steps: CustomStep[]) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.steps = steps;
        if (currentRecipe.steps.length > 0) setStepsAreValid(true);
        else setStepsAreValid(false);
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
                        currentSelectedFormOfDiet={{
                            label: customRecipe.formOfDiet.charAt(0).toUpperCase() + customRecipe.formOfDiet.slice(1),
                            value: customRecipe.formOfDiet.toLowerCase(),
                        }}
                        currentTags={customRecipe.tags}
                        onTotalTime={handleTotalTimeChange}
                        onServings={handleServingsChange}
                        onFoodLifestyle={handleFoodLifestyleChange}
                        onTags={handleTagsChange}
                        useFetchAuth={useFetchWithAuth}
                    />
                );
            case 3:
                return (
                    <AddIngredients
                        currentIngredients={customRecipe.ingredients}
                        onChangeIngredients={handleAddIngredients}
                    />
                );
            case 4:
                return <AddSteps currentSteps={customRecipe.steps} onAddSteps={handleAddSteps} />;
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

    return (
        <form onSubmit={(e) => e.preventDefault()} className="overflow-x-auto h-full">
            {renderStep(stepNr)}
        </form>
    );
};

export default AddRecipeWizard;
