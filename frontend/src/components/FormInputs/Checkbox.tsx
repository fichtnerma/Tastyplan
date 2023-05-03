import { CustomSelectionInput } from 'src/types/types';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
    groupName: string;
    customCheckbox: CustomSelectionInput;
    handleChange: (id: string, checked: boolean) => void;
};

function Checkbox({ groupName, customCheckbox, handleChange }: CheckboxProps) {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                name={groupName}
                id={customCheckbox.id}
                onChange={() => handleChange(customCheckbox.id, customCheckbox.checked)}
                checked={customCheckbox.checked}
            />
            <label htmlFor={customCheckbox.id}>{customCheckbox.label}</label>
        </div>
    );
}

export default Checkbox;
