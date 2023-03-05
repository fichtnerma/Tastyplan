import { Diet, Step } from 'src/types/types';
import { useCallback, useEffect, useState } from 'react';
import Selection from '@components/Selection/Selection';
import { useRouter } from 'next/router';
import ProgressBar from '@components/ProgressBar/ProgressBar';

export default function EatingHabits({ steps }: { steps: Step[] }) {
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(0);
    const [diet, setDiet] = useState<Diet>({ formOfDiet: 'Omnivor', intolerances: [] });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress((100 / steps.length) * currentStep);
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
        (currentDiet: Diet) => {
            setDiet(currentDiet);
        },
        [diet],
    );

    const submitDiet = (dietData: Diet) => {
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
                <form className="flex justify-center py-8 px-12 w-[36rem] bg-white rounded-[20px]">
                    <fieldset className="flex flex-col">
                        <h2 className="text-3xl font-semibold text-gray-custom4 mb-8">{steps[currentStep].title}</h2>
                        <div
                            className={
                                steps[currentStep].isMultiSelection
                                    ? 'grid grid-cols-4 gap-4 mb-6'
                                    : 'flex flex-col items-center'
                            }
                        >
                            <Selection
                                choices={steps[currentStep].choices}
                                isMultiselection={steps[currentStep].isMultiSelection}
                                setChoices={addChoice}
                            />
                        </div>
                        <div className={currentStep > 0 ? 'flex justify-between' : 'flex justify-center'}>
                            {currentStep > 0 && (
                                <button className="font-medium text-gray-custom4" data-anchor="back" onClick={onBack}>
                                    Zurück
                                </button>
                            )}
                            <button className="font-medium text-gray-custom4" data-anchor="next" onClick={onNext}>
                                Weiter
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
}
