import { useState } from 'react';
import { CustomRadioBtn } from 'src/types/types';
import RadioButton from '../Radiobutton';

type RadioBtnProps = {
    groupName: string;
    radioBtns: CustomRadioBtn[];
};

function RadioGroup({ radioBtns, groupName }: RadioBtnProps) {
    const [btnGroup, setButtonGroup] = useState([...radioBtns]);

    const handleGroupChange = (id: string) => {
        const btnGroupCache = [...btnGroup];
        btnGroupCache[+id].checked = true;
        setButtonGroup([...btnGroupCache]);
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
