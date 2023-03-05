import { DietDTO, Step } from 'src/types/types';
import { useCallback, useEffect, useState } from 'react';
import Selection from '@components/Selection/Selection';
import { useRouter } from 'next/router';
import ProgressBar from '@components/ProgressBar/ProgressBar';

export default function EatingHabits({ steps }: { steps: Step[] }) {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [diet, setDiet] = useState<DietDTO>({ formOfDiet: 'Omnivor', intolerances: [] });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress((100 / steps.length) * currentStep);
        router.push('', `/preferences/${steps[currentStep].slug}`);
    }, [currentStep]);

    const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (currentStep === steps.length - 1) {
            submitDiet(diet);
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const onBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
    };

    const addChoice = useCallback(
        (currentDiet: DietDTO) => {
            setDiet(currentDiet);
        },
        [diet],
    );

    const submitDiet = (dietData: DietDTO) => {
        fetch('http://localhost:3000/preferences', {
            method: 'POST',
            body: JSON.stringify({
                formOfDiet: dietData.formOfDiet,
                allergenes: [],
                foodDislikes: [],
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok)
                    router.push({
                        pathname: '/weekOverview',
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const getProgressColor = (progress: number) => {
        if (progress < 30) return '#ef4444';
        if (progress < 50) return '#f97316';
        if (progress < 70) return '#eab308';
        if (progress < 100) return '#22c55e';
        return '#d1d5db';
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <ProgressBar bgColor={getProgressColor(progress)} progress={progress} />
                <form className="flex justify-center flex-col py-8 px-12 w-[36rem] bg-white rounded-[20px]">
                    <fieldset className="flex flex-col items-stretch w-full">
                        <h2 className="text-3xl font-semibold text-gray-custom4 mb-8">{steps[currentStep].title}</h2>
                        <div
                            className={
                                steps[currentStep].isMultiSelection
                                    ? 'grid grid-cols-4 gap-[27px] mb-4'
                                    : 'flex flex-col items-center mb-4'
                            }
                        >
                            <Selection
                                choices={steps[currentStep].choices}
                                isMultiselection={steps[currentStep].isMultiSelection}
                                setChoices={addChoice}
                            />
                        </div>
                    </fieldset>
                    <div className="flex justify-between w-full">
                        {currentStep > 0 && (
                            <button className="font-medium text-gray-custom4" data-anchor="back" onClick={onBack}>
                                Zurück
                            </button>
                        )}
                        <button
                            className={
                                currentStep > 0
                                    ? 'font-medium text-gray-custom4'
                                    : 'font-medium text-gray-custom4 ml-auto'
                            }
                            data-anchor="next"
                            onClick={onNext}
                        >
                            Weiter
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
