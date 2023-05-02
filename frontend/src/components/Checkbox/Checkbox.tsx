import styles from './Checkbox.module.scss';

type CheckBoxProps = {
    label: string;
};

function CheckBox({ label }: CheckBoxProps) {
    return (
        <>
            <label htmlFor={label} className={styles.formControl}>
                <input type="checkbox" name={label} />
                {label}
            </label>
        </>
    );
}

export default CheckBox;
