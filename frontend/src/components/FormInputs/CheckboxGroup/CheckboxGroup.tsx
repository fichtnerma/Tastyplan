import { useState } from 'react';
import { CustomSelectionInput } from 'src/types/types';
import Checkbox from '../Checkbox';

type CheckboxProps = {
    groupName: string;
    checkboxes: CustomSelectionInput[];
};

function CheckboxGroup({ checkboxes, groupName }: CheckboxProps) {
    const [checkboxGroup, setCheckboxGroup] = useState([...checkboxes]);

    const handleGroupChange = (id: string, checked: boolean) => {
        console.log(id);
        const selectionGroupCache = [...checkboxGroup];
        selectionGroupCache[+id].checked = !checked;
        setCheckboxGroup(selectionGroupCache);
    };

    return (
        <div className="w-fit">
            {checkboxGroup.map((checkbox) => (
                <Checkbox
                    customCheckbox={checkbox}
                    key={checkbox.id}
                    groupName={groupName}
                    handleChange={handleGroupChange}
                />
            ))}
        </div>
    );
}

export default CheckboxGroup;
