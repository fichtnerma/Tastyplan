import styles from './Checkbox.module.scss';

type CheckboxProps = {
    label: string;
};

function Checkbox({ label }: CheckboxProps) {
    return (
        <div className={styles.checkboxContainer}>
            <input type="checkbox" name={label} id={label} />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}

export default Checkbox;
