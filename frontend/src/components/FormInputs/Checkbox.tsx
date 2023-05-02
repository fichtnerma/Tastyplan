type CheckboxProps = {
    label: string;
};

function Checkbox({ label }: CheckboxProps) {
    return (
        <>
            <label htmlFor={label}>
                <input type="checkbox" name={label} />
                {label}
            </label>
        </>
    );
}

export default Checkbox;
