import { MouseEvent, useEffect, useRef } from 'react';
import Icon from '@components/Icon/Icon';

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
    const r = element.getBoundingClientRect();

    return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
};

type Props = {
    title: string;
    buttonClose: string;
    buttonProceed: string;
    isOpened: boolean;
    onProceed: () => void;
    onClose: () => void;
    children: React.ReactNode;
};

const DialogModal = ({ title, buttonClose, buttonProceed, isOpened, onProceed, onClose, children }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [isOpened]);

    return (
        <dialog
            ref={ref}
            onCancel={onClose}
            onClick={(e: MouseEvent<Element, globalThis.MouseEvent>) =>
                ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
            }
            className="bg-green-custom_super_light rounded-custom_s overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-[280px]">
                <svg viewBox="0 0 980 249" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M482.174 204.673C258.611 274.469 222.542 257.811 0 182.899V0H980V193.631C721.049 132.558 579.387 174.323 482.174 204.673Z"
                        fill="#007370"
                    />
                </svg>
            </div>
            <div className="relative h-6 w-full">
                <button onClick={onClose} className="right-0 top-1 absolute text-green-custom4">
                    <Icon size={20} icon="close" />
                </button>
            </div>
            <h3 className="h2 text-center text-green-custom4 z-10 relative">{title}</h3>

            {children}

            <div className="flex place-content-between pb-5">
                <button onClick={onClose} className="btn-primary  btn-small">
                    {buttonClose}
                </button>
                <button onClick={onProceed} className="btn-primary  btn-small">
                    {buttonProceed}
                </button>
            </div>
        </dialog>
    );
};

export default DialogModal;
