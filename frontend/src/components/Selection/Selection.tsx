import { useState } from 'react';
import { Diet, FormOfDiet, Intolerance, isFormOfDiet, isIntolerance } from 'src/types/types';
import styles from '../../styles/Selection.module.scss';

export default function Selection({
    choices,
    isMultiselection,
    setChoices,
}: {
    choices: FormOfDiet[] | Intolerance[];
    isMultiselection: boolean;
    setChoices: (choice: FormOfDiet | Intolerance[]) => void;
}) {
    const [selection, setSelection] = useState<FormOfDiet | Intolerance[]>([]);
    if (!isMultiselection) {
        const onSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isFormOfDiet(e.target.value)) {
                return;
            }

            const selectedFormOfDiet = e.target.value;

            setSelection(selectedFormOfDiet);
            setChoices(selectedFormOfDiet);
        };
        return (
            <>
                {choices.map((choice, i) => (
                    <div key={i} className={styles.radioWrapper}>
                        <input
                            type={'radio'}
                            name={choice}
                            value={choice}
                            checked={selection === choice}
                            onChange={onSelectionChange}
                        />
                        <label htmlFor={choice}>{choice}</label>
                    </div>
                ))}
            </>
        );
    } else {
        const onSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isIntolerance(e.target.value)) {
                return;
            }

            const currentSelection: Intolerance[] = [...selection];
            if (currentSelection.includes(e.target.value)) {
                const cleanSelection = currentSelection.filter((el) => el !== e.target.value);
                setSelection([...cleanSelection]);
                setChoices([...cleanSelection]);
            } else {
                currentSelection.push(e.target.value);
                setSelection([...currentSelection]);
                setChoices([...currentSelection]);
            }
        };

        return (
            <>
                {choices.map((choice, i) => (
                    <div key={i} className={styles.checkboxWrapper}>
                        <input
                            type={'checkbox'}
                            name={choice}
                            value={choice}
                            checked={selection.includes(choice)}
                            onChange={onSelectionChange}
                        />
                        <label htmlFor={choice}>{choice}</label>
                    </div>
                ))}
            </>
        );
    }
}
