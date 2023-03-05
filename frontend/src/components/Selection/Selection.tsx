import { useState } from 'react';
import { DietDTO, FormOfDiet, Intolerance, isFormOfDiet, isIntolerance } from 'src/types/types';
import styles from '../../styles/Selection.module.scss';

export default function Selection({
    choices,
    isMultiselection,
    setChoices,
}: {
    choices: FormOfDiet[] | Intolerance[];
    isMultiselection: boolean;
    setChoices: (diet: DietDTO) => void;
}) {
    const [selection, setSelection] = useState<DietDTO>({ formOfDiet: 'Omnivor', intolerances: [] });
    if (!isMultiselection) {
        const onSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isFormOfDiet(e.target.value)) {
                return;
            }

            const selectedFormOfDiet = e.target.value;

            setSelection({ formOfDiet: selectedFormOfDiet, intolerances: [...selection.intolerances] });
            setChoices({ formOfDiet: selectedFormOfDiet, intolerances: [...selection.intolerances] });
        };
        return (
            <>
                {choices.map((choice, i) => (
                    <div key={i} className={styles.radioWrapper}>
                        <input
                            type={'radio'}
                            name={choice}
                            value={choice}
                            checked={selection.formOfDiet === choice}
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

            const currentSelection: Intolerance[] = [...selection.intolerances];
            if (currentSelection.includes(e.target.value)) {
                const cleanSelection = currentSelection.filter((el) => el !== e.target.value);
                setSelection({ formOfDiet: selection.formOfDiet, intolerances: [...cleanSelection] });
                setChoices({ formOfDiet: selection.formOfDiet, intolerances: [...cleanSelection] });
            } else {
                currentSelection.push(e.target.value);
                setSelection({ formOfDiet: selection.formOfDiet, intolerances: [...currentSelection] });
                setChoices({ formOfDiet: selection.formOfDiet, intolerances: [...currentSelection] });
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
                            checked={selection.intolerances.includes(choice as Intolerance)}
                            onChange={onSelectionChange}
                        />
                        <label htmlFor={choice}>{choice}</label>
                    </div>
                ))}
            </>
        );
    }
}
