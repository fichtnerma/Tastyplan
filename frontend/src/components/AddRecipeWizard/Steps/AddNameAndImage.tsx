import { useState } from 'react';
import Image from 'next/image';
import TextInput from '@components/FormInputs/TextInput';

const AddNameAndImage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const handleImgOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };

        setImage(target.files?.[0]);

        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(target.files?.[0]);
    };
    return (
        <fieldset>
            <legend>Add name and image</legend>
            <TextInput value={name} required onChange={setName} label="Name (required)" />

            <label htmlFor="image">Add an Image (optional)</label>
            <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp" //it seems like this only effects the file picker. With workarounds the user is still able to add another file type
                name="image"
                onChange={handleImgOnChange}
            />
            {preview && <Image src={preview as string} width={200} height={200} alt="Upload preview" />}
        </fieldset>
    );
};

export default AddNameAndImage;
