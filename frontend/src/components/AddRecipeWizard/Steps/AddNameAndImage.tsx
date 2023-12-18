import { useState } from 'react';
import ImgDragAndDrop, { UploadedImg } from '@components/ImgDragAndDrop/ImgDragAndDrop';
import TextInput from '@components/FormInputs/TextInput';

type AddNameAndImageProps = {
    currentName: string;
    currentImage: UploadedImg | undefined;
    onNameChange: (name: string) => void;
    onUploadedImgChange: (img: UploadedImg | undefined) => void;
};

const AddNameAndImage = ({ currentName, currentImage, onNameChange, onUploadedImgChange }: AddNameAndImageProps) => {
    const [name, setName] = useState(currentName);
    const [image, setImage] = useState<UploadedImg | undefined>(currentImage);

    const handleUploadedImgChange = (img: UploadedImg | undefined) => {
        if (!img) return;
        setImage(img);
        onUploadedImgChange(img);
    };

    const handleNameChange = (name: string) => {
        setName(name);
        onNameChange(name);
    };

    return (
        <fieldset>
            <legend className="h1">Add name and image</legend>
            <TextInput value={name} required onChange={handleNameChange} label="Name" />

            <label className="block mt-5 mb-1" htmlFor="image">
                Add an Image (optional)
            </label>
            <ImgDragAndDrop currentImage={image} onUploadedImgChange={handleUploadedImgChange} />
        </fieldset>
    );
};

export default AddNameAndImage;
