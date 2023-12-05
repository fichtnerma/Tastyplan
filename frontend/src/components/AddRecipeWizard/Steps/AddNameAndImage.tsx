import { useState } from 'react';
import ImgDragAndDrop from '@components/ImgDragAndDrop/ImgDragAndDrop';
import TextInput from '@components/FormInputs/TextInput';

type AddNameAndImageProps = {
    onNameChange: (name: string) => void;
    onUploadedImgChange: (img: File) => void;
};

const AddNameAndImage = ({ onNameChange, onUploadedImgChange }: AddNameAndImageProps) => {
    const [name, setName] = useState('');

    const handleUploadedImgChange = (img: File) => {
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
            <ImgDragAndDrop onUploadedImgChange={handleUploadedImgChange} />
        </fieldset>
    );
};

export default AddNameAndImage;
