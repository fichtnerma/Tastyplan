import { CustomRadioBtn } from 'src/types/types';
import styles from './Radiobutton.module.scss';

type RadiobuttonProps = {
    groupName: string;
    radioBtn: CustomRadioBtn;
    handleChange: (id: string) => void;
};

function RadioButton({ radioBtn, groupName, handleChange }: RadiobuttonProps) {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="radio"
                name={groupName}
                id={radioBtn.id}
                onChange={() => handleChange(radioBtn.id)}
                checked={radioBtn.checked}
            />
            <label htmlFor={radioBtn.id}>{radioBtn.label}</label>
        </div>
    );
}

export default RadioButton;
