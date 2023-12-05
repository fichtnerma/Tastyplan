import { MouseEvent, useEffect, useRef } from 'react';
import Icon from '@components/Icon/Icon';
import styles from './DialogModal.module.scss';

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
    const r = element.getBoundingClientRect();
    return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
};

type Props = {
    isOpened: boolean;
    onClose: () => void;
    children: React.ReactNode;
    classNames?: string;
};

const DialogModal = ({ isOpened, onClose, children, classNames }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    const handleClose = () => {
        onClose();
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        if (isOpened) {
            document.body.style.overflow = 'hidden';
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [isOpened]);

    return (
        <dialog
            ref={ref}
            onCancel={handleClose}
            onClick={(e: MouseEvent<Element, globalThis.MouseEvent>) =>
                ref.current && !isClickInsideRectangle(e, ref.current) && handleClose()
            }
            className={`rounded-custom_s max overflow-hidden ${styles.modal}`}
        >
            <div className={`${classNames}`}>
                <div className=" col-start-2 row-start-1 relative h-6 w-full col-span-2">
                    <button onClick={handleClose} className="right-0 top-1 absolute text-green-custom2">
                        <Icon size={20} icon="close" />
                    </button>
                </div>
                {children}
            </div>
        </dialog>
    );
};

export default DialogModal;
