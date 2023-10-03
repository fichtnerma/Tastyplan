import { useEffect, useState } from 'react';
import DialogModal from '@components/DialogModal/DialogModal';
import useFetchWithAuth from '@hooks/fetchWithAuth';

function ChangeRecipeModal({ open }: { open: boolean }) {
    const [isOpened, setIsOpened] = useState(false);
    const { data } = useFetchWithAuth('/service/recipes/recommend');

    console.log(data);

    useEffect(() => {
        setIsOpened(open);
    }, [open]);

    const onProceed = () => {
        console.log('Proceed clicked');
    };

    return (
        <>
            <DialogModal
                title="Choose a new recipe"
                buttonClose="I take the original recipe"
                isOpened={isOpened}
                onProceed={onProceed}
                onClose={() => setIsOpened(false)}
            >
                {/* <p>To close: click Close, press Escape, or click outside.</p> */}
            </DialogModal>
        </>
    );
}

export default ChangeRecipeModal;
