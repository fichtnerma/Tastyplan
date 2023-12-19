import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';

export type CustomStep = {
    id: string;
    description: string;
    stepCount: number;
};

type SortableStepProps = {
    step: CustomStep;
    index: number;
};

const SortableStep = ({ step, index }: SortableStepProps) => {
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
                <h2 className="!mb-0">Step {index + 1}</h2>
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
    currentSteps: CustomStep[];
    onAddSteps: (steps: CustomStep[]) => void;
};
const AddSteps = ({ currentSteps, onAddSteps }: AddStepsProps) => {
    const [steps, setSteps] = useState<CustomStep[]>(currentSteps);
    const [isNewStep, setIsNewStep] = useState(false);
    const [newStep, setNewStep] = useState<CustomStep>({ id: '', description: '', stepCount: 0 });
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id === over?.id) {
            return;
        }

        let newSteps: CustomStep[] = [];

        setSteps((steps) => {
            const oldIndex = steps.findIndex((step) => step?.id === active?.id);
            const newIndex = steps.findIndex((step) => step?.id === over?.id);
            const reorderedSteps = arrayMove(steps, oldIndex, newIndex);
            newSteps = [...reorderedSteps];
            return reorderedSteps;
        });
        onAddSteps(newSteps);
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
                            {steps.map((step, index) => (
                                <SortableStep key={step.id} step={step} index={index} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </ol>
                {!isNewStep ? (
                    <button onClick={() => setIsNewStep(true)}>Add new step</button>
                ) : (
                    <div className="flex justify-between">
                        <div className="flex flex-col lg:flex-row lg:gap-2">
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
