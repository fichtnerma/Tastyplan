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
        <div className={styles.checkboxContainer} data-cy={`${customCheckbox.id}-checkbox`}>
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
            <label htmlFor={customCheckbox.id}>{customCheckbox.label}</label>
        </div>
    );
}

export default Checkbox;
