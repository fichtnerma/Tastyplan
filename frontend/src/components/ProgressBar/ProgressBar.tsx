import { useEffect, useState } from 'react';
import styles from '../ProgressBar/ProgressBar.module.scss';

type Props = {
    stepNames: string[];
    activeStep: number;
    foodLifeStyleSelected: boolean;
    onClick: (elementName: string) => void;
};

function ProgressBar({ stepNames, activeStep, foodLifeStyleSelected, onClick }: Props) {
    const [numbersArr, setNumbersArr] = useState<number[]>([]);

    useEffect(() => {
        const numbersAsArr = Array.from(Array(stepNames.length + 1).keys());
        numbersAsArr.shift();
        setNumbersArr([...numbersAsArr]);
    }, [activeStep, stepNames]);

    const getGradient = (stepsCount: number, activeStep: number) => {
        if (activeStep === 1) return 0;
        if (activeStep === stepsCount) return 100;

        const spaceBetweenPoints = Math.floor((stepsCount / (stepsCount - 1)) * (1 / stepsCount) * 100);
        return spaceBetweenPoints * (activeStep - 1);
    };

    const getStepClass = (elNr: number) => {
        if (elNr <= activeStep) return styles.stepDone;

        if (!foodLifeStyleSelected) return `${styles.stepNotDone} + ${styles.stepDisabled}`;
        else return styles.stepNotDone;
    };

    const handleStepClick = (e: React.MouseEvent) => {
        if (!foodLifeStyleSelected) return;

        const element = e.target as HTMLElement;
        const elementName = element.getAttribute('data-step-name');
        if (elementName) onClick(elementName);
    };

    return (
        <div className="flex justify-between items-center relative w-full" onClick={handleStepClick}>
            <div
                className="absolute top-1/2 translate-y-[-50%] w-full h-[3px]"
                style={{
                    background: `linear-gradient(to right, var(--green-dark) ${getGradient(
                        stepNames.length,
                        activeStep,
                    )}%, var(--gray-5) ${getGradient(stepNames.length, activeStep)}%)`,
                }}
            ></div>
            {numbersArr.map((el, i) => (
                <div key={el} className="relative flex items-center">
                    <span
                        data-step-name={stepNames[i]}
                        className={getStepClass(el)}
                        style={{ transform: el === activeStep ? 'scale(2)' : '' }}
                    ></span>
                    <p className={el <= activeStep ? styles.activeLabel : styles.label}>{stepNames[i]}</p>
                </div>
            ))}
        </div>
    );
}

export default ProgressBar;
