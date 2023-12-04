import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import Icon from '@components/Icon/Icon';

const isMobile = window.innerWidth <= 768;

const dropzoneStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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

type UploadedImg = {
    file: File;
    preview: string;
};

const ImgDragAndDrop = () => {
    const [uploadedImg, setUploadedImg] = useState<UploadedImg | undefined>(undefined);

    const focusedStyle = {
        borderColor: '#3a97f9',
    };

    const acceptStyle = {
        borderColor: '#007370',
    };

    const rejectStyle = {
        borderColor: '#d54444',
    };

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        accept: { 'image/jpeg': [], 'image/jpg': [], 'image/png': [], 'image/webp': [] },
        maxFiles: 1,
        multiple: false,
        onDrop: (acceptedFiles: File[]) => {
            setUploadedImg({ file: acceptedFiles[0], preview: URL.createObjectURL(acceptedFiles[0]) });
        },
    });

    const style = useMemo(
        () => ({
            ...dropzoneStyles,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject, acceptStyle, focusedStyle, rejectStyle],
    );

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        if (uploadedImg?.preview) return () => URL.revokeObjectURL(uploadedImg.preview);
        return;
    }, [uploadedImg?.preview]);

    return (
        <div>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
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
            {uploadedImg?.preview && (
                <aside className="flex justify-center mt-4">
                    <Image
                        width={200}
                        height={200}
                        src={uploadedImg?.preview}
                        alt="image preview"
                        onLoad={() => URL.revokeObjectURL(uploadedImg?.preview)}
                    />
                </aside>
            )}
        </div>
    );
};

export default ImgDragAndDrop;
