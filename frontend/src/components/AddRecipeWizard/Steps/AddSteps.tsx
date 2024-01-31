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
    onDelete: (id: string) => void;
};

const SortableStep = ({ step, index, onDelete }: SortableStepProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="flex mb-5">
            <div
                className="basis-[95%] flex justify-between items-center pb-2 border-gray-custom3 border-b-2 border-solid"
                ref={setNodeRef}
                {...attributes}
                role=""
                style={style}
                {...listeners}
            >
                <div>
                    <h2 className="!mb-0 h5">Step {index + 1}</h2>
                    <p className="block lg:hidden max-w-[210px] sm:max-w-[500px]">{truncate(step.description, 50)}</p>
                    <p className="hidden lg:block max-w-[210px] sm:max-w-[500px]">{truncate(step.description, 15)}</p>
                </div>
                <div className="h-fit w-5">
                    <span className="block h-[2px] w-full bg-gray-custom3 mb-[4px] rounded-[2px]"></span>
                    <span className="block h-[2px] w-full bg-gray-custom3 rounded-[2px]"></span>
                    <span className="block h-[2px] w-full bg-gray-custom3 mt-[4px] rounded-[2px]"></span>
                </div>
            </div>
            <div className="basis-[5%] flex items-center justify-end">
                <button
                    className="mb-[12px]"
                    aria-label="button"
                    data-testid="delete-btn"
                    onClick={() => onDelete(step.id)}
                    data-cy={`delete-step-${index + 1}-btn`}
                >
                    <Icon icon="close" classNames="text-gray-custom3"></Icon>
                </button>
            </div>
        </div>
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
        document.body.style.overflow = 'auto'; //Necessary because dialog component currently does not take care of that
        const step = { ...newStep };
        step.id = self.crypto.randomUUID();

        const currentSteps = [...steps];
        currentSteps.push(step);
        setSteps(currentSteps);
        onAddSteps(currentSteps);
        setNewStep({ id: '', description: '' });
        setDialogIsOpen(false);
    };

    const handleDelete = (id: string) => {
        const currentSteps = [...steps];
        const filteredSteps = currentSteps.filter((step) => step.id !== id);
        setSteps(filteredSteps);
    };

    const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDialogIsOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogIsOpen(false);
    };

    return (
        <fieldset className="mb-5 lg:mb-0 overflow-x-auto h-full">
            <legend className="h3">Add the Steps</legend>
            <div className="flex w-full">
                <div className="mb-4 bg-green-custom4 rounded-[30px] overflow-x-auto pb-8 p-2 lg:p-4 lg:w-1/3 w-full">
                    <div className="lg:block lg:max-h-[330px]" data-cy="steps-wrapper">
                        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext
                                items={steps.map((step: CustomStep) => step.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {steps.map((step, index) => (
                                    <SortableStep key={step.id} step={step} index={index} onDelete={handleDelete} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                    <div className="block lg:hidden">
                        <button className="flex items-center mx-auto my-0" onClick={handleOpenDialog}>
                            <Icon size={20} icon="addCircle" color="#007370" />
                            <span className="block ml-2 text-green-custom2">Add new step</span>
                        </button>
                        <DialogModal isOpened={dialogIsOpen} onClose={handleCloseDialog}>
                            <div className="flex flex-col">
                                <h1 className="text-green-custom2">Add new step</h1>
                                <label className="h3" htmlFor="stepDesc">
                                    Description
                                </label>
                                <textarea
                                    className="p-5 mb-5 border-2 border-green-custom2 rounded-[30px] h-[50vh]"
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
                <div className="hidden lg:block w-2/3 pl-5">
                    <div className="flex flex-col">
                        <label className="h4" htmlFor="stepDesc">
                            Description
                        </label>
                        <textarea
                            className="p-5 mb-5 border-2 border-green-custom2 rounded-[30px] bg-white-custom"
                            name="stepDesc"
                            id="stepDesc"
                            value={newStep.description}
                            onChange={handleDescriptionChange}
                            data-cy="step-desc-input"
                        ></textarea>
                        <button
                            className="flex items-center mx-auto my-0"
                            onClick={handleNewStep}
                            data-cy="add-new-step-btn"
                        >
                            <Icon size={20} icon="addCircle" color="#007370" />
                            <span className="block ml-2 text-green-custom2">Add new step</span>
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default AddSteps;
