import { CustomCheckboxInput } from 'src/types/types';
import styles from './Radiobutton.module.scss';

type RadiobuttonProps = {
    groupName: string;
    radioBtn: CustomCheckboxInput;
    handleChange: (id: string, checked: boolean) => void;
};

function RadioButton({ groupName, radioBtn, handleChange }: RadiobuttonProps) {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="radio"
                name={groupName}
                id={radioBtn.id}
                onChange={() => handleChange(radioBtn.id, radioBtn.checked)}
                defaultChecked={radioBtn.checked}
            />
            <label htmlFor={radioBtn.id}>{radioBtn.label}</label>
        </div>
    );
}

export default RadioButton;
