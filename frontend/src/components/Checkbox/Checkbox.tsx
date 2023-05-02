import styles from './Checkbox.module.scss';

type CheckBoxProps = {
    label: string;
};

function Checkbox({ label }: CheckBoxProps) {
    return (
        <>
            <label htmlFor={label} className={styles.formControl}>
                <input type="checkbox" name={label} />
                {label}
            </label>
        </>
    );
}

export default Checkbox;
