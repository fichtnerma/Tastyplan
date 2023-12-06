import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import TextInput from '@components/FormInputs/TextInput';

export type CustomStep = {
    id: string;
    title: string;
    description: string;
};

const stepDummies: CustomStep[] = [
    { id: self.crypto.randomUUID(), title: 'Step 1', description: 'This is step 1' },
    { id: self.crypto.randomUUID(), title: 'Step 2', description: 'This is Step 2' },
    { id: self.crypto.randomUUID(), title: 'Step 3', description: 'This is Step 3' },
];

type SortableStepProps = {
    step: CustomStep;
};

const SortableStep = ({ step }: SortableStepProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <li
            className="flex justify-between items-center pb-2 mb-5 border-gray-custom3 border-b-2 border-solid"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div>
                <h2 className="!mb-0">{step.title}</h2>
                <p>{step.description}</p>
            </div>
            <div className="h-6 w-8">
                <span className="block h-1 w-full bg-gray-custom3 mb-[4px] rounded-[2px]"></span>
                <span className="block h-1 w-full bg-gray-custom3 rounded-[2px]"></span>
                <span className="block h-1 w-full bg-gray-custom3 mt-[4px] rounded-[2px]"></span>
            </div>
        </li>
    );
};

type AddStepsProps = {
    onAddSteps: (steps: CustomStep[]) => void;
};
const AddSteps = ({ onAddSteps }: AddStepsProps) => {
    const [steps, setSteps] = useState<CustomStep[]>(stepDummies);
    const [isNewStep, setIsNewStep] = useState(false);
    const [newStep, setNewStep] = useState<CustomStep>({ id: '', title: '', description: '' });
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

    const handleTitleChange = (newTitle: string) => {
        const step = { ...newStep };
        step.title = newTitle;
        setNewStep(step);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const step = { ...newStep };
        step.description = e.target.value;
        setNewStep(step);
    };

    const handleNewStep = () => {
        const step = { ...newStep };
        step.id = self.crypto.randomUUID();

        const currentSteps = [...steps];
        currentSteps.push(step);
        setSteps(currentSteps);
        setIsNewStep(false);
        onAddSteps(currentSteps);
    };

    return (
        <fieldset className="mb-5 lg:mb-0">
            <legend className="h1">Add the Steps</legend>
            <div className="p-5 bg-green-custom4 rounded-[30px]">
                <ol className="lg:block lg:max-h-[300px] lg:overflow-y-auto lg:overflow-x-hidden">
                    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                        <SortableContext
                            items={steps.map((step: CustomStep) => step.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {steps.map((step) => (
                                <SortableStep key={step.id} step={step} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </ol>
                {!isNewStep ? (
                    <button onClick={() => setIsNewStep(true)}>Add new step</button>
                ) : (
                    <div className="flex justify-between">
                        <div className="flex flex-col lg:flex-row lg:gap-2">
                            <TextInput required value={newStep.title} onChange={handleTitleChange} label="Title" />
                            <div className="flex flex-col">
                                <label className="mb-5 lg:mb-1" htmlFor="stepDesc">
                                    Description
                                </label>
                                <textarea
                                    name="stepDesc"
                                    id="stepDesc"
                                    value={newStep.description}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                            </div>
                        </div>
                        <button onClick={handleNewStep}>+</button>
                    </div>
                )}
            </div>
        </fieldset>
    );
};

export default AddSteps;
