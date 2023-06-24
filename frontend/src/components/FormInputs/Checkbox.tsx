import { CustomSelectionInput } from 'src/types/types';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
    groupName: string;
    customCheckbox: CustomSelectionInput;
    handleChange: (id: string, checked: boolean) => void;
    disabled: boolean;
};

function Checkbox({ groupName, customCheckbox, handleChange, disabled }: CheckboxProps) {
    return (
        <label htmlFor={customCheckbox.id} className={styles.formControl}>
            <input
                type="checkbox"
                name={groupName}
                id={customCheckbox.id}
                onChange={() => {
                    if (!disabled) return handleChange(customCheckbox.id, customCheckbox.checked);
                }}
                checked={disabled ? true : customCheckbox.checked}
                disabled={disabled}
            />
            <span className="checkbox-label">{customCheckbox.label}</span>
        </label>
    );
}

export default Checkbox;
