import { MouseEvent, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Icon from '@components/Icon/Icon';
import { SwipeConfig } from '@helpers/SwipeConfig';
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

    const handlers = useSwipeable({
        onSwipedDown: (eventData) => {
            if (ref.current) {
                if (eventData.deltaY > 250) handleClose();
                ref.current.style.transform = `translateY(0px)`;
            }
        },
        onSwiping: (eventData) => {
            if (eventData.dir === 'Down' && ref.current) {
                ref.current.style.transform = `translateY(${eventData.deltaY}px)`;
            }
        },
        ...SwipeConfig,
    });

    return (
        <dialog
            ref={ref}
            onCancel={handleClose}
            onClick={(e: MouseEvent<Element, globalThis.MouseEvent>) =>
                ref.current && !isClickInsideRectangle(e, ref.current) && handleClose()
            }
            className={`rounded-custom_s max overflow-hidden ${styles.modal}`}
        >
            <div {...handlers} className="flex sm:hidden absolute justify-center w-full top-1">
                <div className="w-20 rounded-md h-1 bg-black"></div>
            </div>
            <div className={`${classNames}`}>
                <div className="relative h-6 w-full flex justify-end">
                    <button onClick={handleClose} className=" text-green-custom2" aria-label="close">
                        <Icon size={20} icon="close" />
                    </button>
                </div>
                {children}
            </div>
        </dialog>
    );
};

export default DialogModal;
