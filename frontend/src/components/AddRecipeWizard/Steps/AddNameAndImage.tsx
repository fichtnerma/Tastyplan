import { useState } from 'react';
import ImgDragAndDrop from '@components/ImgDragAndDrop/ImgDragAndDrop';
import TextInput from '@components/FormInputs/TextInput';

const AddNameAndImage = () => {
    const [name, setName] = useState('');

    const handleUploadedImgChange = (img: File) => {
        console.log(img);
    };

    return (
        <fieldset>
            <legend className="h1">Add name and image</legend>
            <TextInput value={name} required onChange={setName} label="Name" />

            <label className="block mt-5 mb-1" htmlFor="image">
                Add an Image (optional)
            </label>
            <ImgDragAndDrop onUploadedImgChange={handleUploadedImgChange} />
        </fieldset>
    );
};

export default AddNameAndImage;
