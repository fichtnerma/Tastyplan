import { CustomCheckboxInput } from 'src/types/types';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
    groupName: string;
    customCheckbox: CustomCheckboxInput;
    handleChange: (id: string, value: string, checked: boolean) => void;
    disabled: boolean;
};

function Checkbox({ groupName, customCheckbox, handleChange, disabled }: CheckboxProps) {
    return (
        <label htmlFor={customCheckbox.id} className={styles.formControl}>
            <input
                type="checkbox"
                name={groupName}
                id={customCheckbox.id}
                value={customCheckbox.value}
                onChange={() => {
                    if (!disabled)
                        return handleChange(customCheckbox.id, customCheckbox.value, !customCheckbox.checked);
                }}
                checked={disabled ? true : customCheckbox.checked}
                disabled={disabled}
                data-cy={`${groupName}-${customCheckbox.label}-checkbox`}
            />
            <span className="checkbox-label">{customCheckbox.label}</span>
        </label>
    );
}

export default Checkbox;
