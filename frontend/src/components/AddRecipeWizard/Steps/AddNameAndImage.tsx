import { useState } from 'react';
import ImgDragAndDrop from '@components/ImgDragAndDrop/ImgDragAndDrop';
import TextInput from '@components/FormInputs/TextInput';

type AddNameAndImageProps = {
    currentName: string;
    currentImage: string | undefined;
    onNameChange: (name: string) => void;
    onUploadedImgChange: (img: string | undefined) => void;
};

const AddNameAndImage = ({ currentName, currentImage, onNameChange, onUploadedImgChange }: AddNameAndImageProps) => {
    const [name, setName] = useState(currentName);
    const [image, setImage] = useState<string | undefined>(currentImage);

    const handleUploadedImgChange = (img64: string | undefined) => {
        setImage(img64);
        onUploadedImgChange(img64);
    };

    const handleNameChange = (name: string) => {
        setName(name);
        onNameChange(name);
    };

    return (
        <fieldset data-testid="imgDragDrop-fieldset">
            <legend className="h3">Add name and image</legend>
            <div className="p-2 pt-0 pb-8" data-testid="input-wrapper">
                <TextInput value={name} required onChange={handleNameChange} label="Name" />
                {!image && (
                    <label className="block mt-5 mb-1" htmlFor="uploadImg">
                        Add an Image (optional)
                    </label>
                )}
                <ImgDragAndDrop currentImage={image} onUploadedImgChange={handleUploadedImgChange} />
            </div>
        </fieldset>
    );
};

export default AddNameAndImage;
