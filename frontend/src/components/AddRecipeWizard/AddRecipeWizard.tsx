import { useState } from 'react';
import Keyfacts from './Steps/Keyfacts';
import AddNameAndImage from './Steps/AddNameAndImage';
import AddIngredients from './Steps/AddIngredients';

type CustomRecipe = {
    name: string;
    image: File | undefined;
};

type AddRecipeWizardProps = {
    stepNr: number;
};

const AddRecipeWizard = ({ stepNr }: AddRecipeWizardProps) => {
    const [customRecipe, setCustomeRecipe] = useState<CustomRecipe>({ name: '', image: undefined });

    const handleNameChange = (name: string) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.name = name;
        setCustomeRecipe(currentRecipe);
    };

    const onUploadedImgChange = (img: File) => {
        const currentRecipe = { ...customRecipe };
        currentRecipe.image = img;
        setCustomeRecipe(currentRecipe);
    };

    const renderStep = (stepNumber: number) => {
        switch (stepNumber) {
            case 2:
                return <Keyfacts />;
            case 3:
                return <AddIngredients />;
            default:
                return <AddNameAndImage onNameChange={handleNameChange} onUploadedImgChange={onUploadedImgChange} />;
        }
    };

    return <form>{renderStep(stepNr)}</form>;
};

export default AddRecipeWizard;
