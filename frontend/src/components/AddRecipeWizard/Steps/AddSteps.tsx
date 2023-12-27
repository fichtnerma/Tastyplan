import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import Icon from '@components/Icon/Icon';
import DialogModal from '@components/DialogModal/DialogModal';
import { truncate } from '@helpers/utils';

export type CustomStep = {
    id: string;
    description: string;
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
                <p className="max-w-[210px] sm:max-w-[500px]">{truncate(step.description, 50)}</p>
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
    const [newStep, setNewStep] = useState<CustomStep>({ id: '', description: '' });
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
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

    const handleNewStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const step = { ...newStep };
        step.id = self.crypto.randomUUID();

        const currentSteps = [...steps];
        currentSteps.push(step);
        setSteps(currentSteps);
        onAddSteps(currentSteps);
        setNewStep({ id: '', description: '' });
        setDialogIsOpen(false);
    };

    const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDialogIsOpen(true);
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
                <div>
                    <button className="flex items-center mx-auto my-0" onClick={handleOpenDialog}>
                        <Icon size={20} icon="addCircle" color="#007370" />
                        <span className="block ml-2 text-green-custom2">Add new step</span>
                    </button>
                    <DialogModal isOpened={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
                        <div className="flex flex-col">
                            <h1 className="text-green-custom2">Add new step</h1>
                            <label className="h3" htmlFor="stepDesc">
                                Description
                            </label>
                            <textarea
                                className="p-5 mb-5 border-2 border-green-custom2 rounded-[30px]"
                                name="stepDesc"
                                id="stepDesc"
                                value={newStep.description}
                                onChange={handleDescriptionChange}
                            ></textarea>
                            <button className="flex items-center mx-auto my-0" onClick={handleNewStep}>
                                <Icon size={20} icon="addCircle" color="#007370" />
                                <span className="block ml-2 text-green-custom2">Add new step</span>
                            </button>
                        </div>
                    </DialogModal>
                </div>
            </div>
        </fieldset>
    );
};

export default AddSteps;
