import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import Icon from '@components/Icon/Icon';

const dropzoneStyles = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    height: '150px',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#D6E5E3',
    backgroundColor: '#D6E5E3',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

export type UploadedImg = {
    file: File | undefined;
    preview?: string;
};

type ImgDragAndDropProps = {
    currentImage: string | undefined;
    onUploadedImgChange: (img64: string | undefined) => void;
};

const ImgDragAndDrop = ({ currentImage, onUploadedImgChange }: ImgDragAndDropProps) => {
    const [uploadedImg, setUploadedImg] = useState<string | undefined>(currentImage);

    let isMobile = false;

    if (typeof window !== 'undefined') isMobile = window.innerWidth <= 768;

    const focusedStyle = {
        borderColor: '#3a97f9',
    };

    const acceptStyle = {
        borderColor: '#007370',
    };

    const rejectStyle = {
        borderColor: '#d54444',
    };

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result;

                if (!result) {
                    reject;
                    return;
                }

                if (typeof result === 'string') resolve(result);
            };
            reader.onerror = reject;
        });

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        accept: { 'image/jpeg': [], 'image/jpg': [], 'image/png': [], 'image/webp': [] },
        maxFiles: 1,
        multiple: false,
        onDrop: async (acceptedFiles: File[]) => {
            const reader = new FileReader();
            const acceptedFile = acceptedFiles[0];
            reader.readAsDataURL(acceptedFile);

            const base64Data: string | ArrayBuffer | null = await toBase64(acceptedFile);
            setUploadedImg(base64Data);
            onUploadedImgChange(base64Data);
        },
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

    const removeImg = () => {
        setUploadedImg(undefined);
        onUploadedImgChange(undefined);
    };

    return (
        <div>
            {!uploadedImg && (
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} id="uploadImg" />
                    {isDragActive ? (
                        <div className="flex flex-col items-center">
                            <Icon size={34} icon="addCircle" color="#007370"></Icon>
                            <p className="mt-2">Drop files here ...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <Icon size={34} icon="addCircle" color="#007370"></Icon>
                            {!isMobile && <p className="mt-2">Drag&Drop or Browse</p>}
                        </div>
                    )}
                </div>
            )}
            {uploadedImg && (
                <aside className="flex flex-col gap-4 items-center mt-4">
                    <Image width={200} height={200} src={uploadedImg} alt="image preview" />
                    <button className="btn-primary" onClick={removeImg}>
                        remove img
                    </button>
                </aside>
            )}
        </div>
    );
};

export default ImgDragAndDrop;
