import { useEffect, useState } from 'react';
import { CustomSelectionInput } from 'src/types/types';
import Checkbox from '../Checkbox';

type CheckboxProps = {
    groupName: string;
    checkboxes: CustomSelectionInput[];
    onCheckboxSelect?: (id: string) => void;
    disabled: boolean;
};

function CheckboxGroup({ checkboxes, groupName, onCheckboxSelect, disabled }: CheckboxProps) {
    const [checkboxGroup, setCheckboxGroup] = useState(checkboxes);

    useEffect(() => {
        setCheckboxGroup(checkboxes);
    }, [checkboxes]);

    const handleGroupChange = (id: string, checked: boolean) => {
        const updatedSelection = [...checkboxGroup].map((selection) => {
            if (selection.id === id)
                return {
                    id: selection.id,
                    label: selection.label,
                    checked: !checked,
                };
            return selection;
        });
        setCheckboxGroup(updatedSelection);

        if (onCheckboxSelect) onCheckboxSelect(id);
    };

    return (
        <div className="w-fit inline-grid grid-cols-1 gap-2">
            {checkboxGroup.map((checkbox) => (
                <Checkbox
                    customCheckbox={checkbox}
                    key={checkbox.id}
                    groupName={groupName}
                    handleChange={handleGroupChange}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}

export default CheckboxGroup;
