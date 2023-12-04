import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import Icon from '@components/Icon/Icon';
import TextInput from '@components/FormInputs/TextInput';

const dropzoneStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: 30,
    backgroundColor: '#D6E5E3',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const AddNameAndImage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(acceptedFiles[0]);
    }, []);

    const focusedStyle = {
        borderColor: '#2196f3',
    };

    const acceptStyle = {
        borderColor: '#00e676',
    };

    const rejectStyle = {
        borderColor: '#d54444',
    };

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': [], 'image/jpg': [], 'image/png': [], 'image/webp': [] },
        maxFiles: 1,
    });

    const style = useMemo(
        () => ({
            ...dropzoneStyles,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject],
    );

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
            <legend className="h1">Add name and image</legend>
            <TextInput value={name} required onChange={setName} label="Name (required)" />

            <label htmlFor="image">Add an Image (optional)</label>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <div className="flex flex-col items-center">
                        <Icon size={34} icon="addCircle" color="#007370"></Icon>
                        <p>Drag&Drop or Browse</p>
                    </div>
                )}
                {preview && <Image src={preview as string} width={200} height={200} alt="Upload preview" />}
            </div>
        </fieldset>
    );
};

export default AddNameAndImage;
