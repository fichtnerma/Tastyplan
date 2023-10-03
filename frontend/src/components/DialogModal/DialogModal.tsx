import { MouseEvent, useEffect, useRef } from 'react';
import Icon from '@components/Icon/Icon';
// import styles from "./DialogModal.module.scss";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
    const r = element.getBoundingClientRect();

    return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
};

type Props = {
    title: string;
    buttonClose: string;
    isOpened: boolean;
    onProceed: () => void;
    onClose: () => void;
    children: React.ReactNode;
};

const DialogModal = ({ title, buttonClose, isOpened, onProceed, onClose, children }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
            document.body.classList.add('modal-open'); // prevent bg scroll
        } else {
            ref.current?.close();
            document.body.classList.remove('modal-open');
        }
    }, [isOpened]);

    const proceedAndClose = () => {
        onProceed();
        onClose();
    };

    return (
        <dialog
            ref={ref}
            onCancel={onClose}
            onClick={(e: MouseEvent<Element, globalThis.MouseEvent>) =>
                ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
            }
            className="bg-green-custom4 rounded-custom_s"
        >
            <div className="relative h-6 w-full">
                <button onClick={onClose} className="right-0 top-1 absolute">
                    <Icon size={20} icon="close" />
                </button>
            </div>
            <h3 className="h2 px-6">{title}</h3>

            {children}

            <div className="flex gap-4">
                <button onClick={onClose} className="btn-primary  btn-small">
                    {buttonClose}
                </button>
                <button onClick={proceedAndClose} className="btn-primary  btn-small">
                    No recipe for this mealtime
                </button>
            </div>
        </dialog>
    );
};

export default DialogModal;
