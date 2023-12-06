import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';

type Step = {
    id: string;
    title: string;
    description: string;
};

const stepDummies: Step[] = [
    { id: self.crypto.randomUUID(), title: 'Step 1', description: 'This is step 1' },
    { id: self.crypto.randomUUID(), title: 'Step 2', description: 'This is Step 2' },
    { id: self.crypto.randomUUID(), title: 'Step 3', description: 'This is Step 3' },
];

console.log(stepDummies);
type SortableStepProps = {
    step: Step;
};
const SortableStep = ({ step }: SortableStepProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="step">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
        </li>
    );
};
const AddSteps = () => {
    const [steps, setSteps] = useState<Step[]>(stepDummies);
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id === over?.id) {
            return;
        }

        setSteps((steps) => {
            const oldIndex = steps.findIndex((step) => step?.id === active?.id);
            const newIndex = steps.findIndex((step) => step?.id === over?.id);
            return arrayMove(steps, oldIndex, newIndex);
        });
    };

    return (
        <fieldset>
            <legend>Add the Steps</legend>
            <ol>
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={steps.map((step: Step) => step.id)} strategy={verticalListSortingStrategy}>
                        {steps.map((step) => (
                            <SortableStep key={step.id} step={step} />
                        ))}
                    </SortableContext>
                </DndContext>
            </ol>
        </fieldset>
    );
};

export default AddSteps;
