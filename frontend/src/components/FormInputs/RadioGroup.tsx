import { useState } from 'react';
import { CustomCheckboxInput } from 'src/types/types';
import RadioButton from './Radiobutton';

type RadioBtnProps = {
    groupName: string;
    radioBtns: CustomCheckboxInput[];
};

function RadioGroup({ radioBtns, groupName }: RadioBtnProps) {
    const [btnGroup, setButtonGroup] = useState([...radioBtns]);

    const handleGroupChange = (id: string, checked: boolean) => {
        const btnGroupCache = [...btnGroup];
        btnGroupCache[+id].checked = !checked;
        setButtonGroup(btnGroupCache);
    };

    return (
        <div className="w-fit">
            {btnGroup.map((btn) => (
                <RadioButton radioBtn={btn} key={btn.id} groupName={groupName} handleChange={handleGroupChange} />
            ))}
        </div>
    );
}

export default RadioGroup;
