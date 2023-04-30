import { useEffect, useState } from 'react';
import styles from '../ProgressBar/ProgressBar.module.scss';

type Props = {
    stepNames: string[];
    activeStep: number;
    onClick: (elementName: string) => void;
};

function ProgressBar({ stepNames, activeStep, onClick }: Props) {
    const [numbersArr, setNumbersArr] = useState<number[]>([]);

    const getGradient = (stepsCount: number, activeStep: number) => {
        if (activeStep === 1) return 0;
        if (stepsCount / activeStep === stepsCount / 2) return 50;
        return (activeStep / stepsCount) * 100;
    };

    useEffect(() => {
        const numbersAsArr = Array.from(Array(stepNames.length + 1).keys());
        numbersAsArr.shift();
        setNumbersArr([...numbersAsArr]);
    }, [activeStep, stepNames]);

    const handleStepClick = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        const elementName = element.getAttribute('data-step-name');
        if (elementName) onClick(elementName);
    };

    return (
        <div className="flex justify-between items-center relative w-full" onClick={handleStepClick}>
            <div
                className="absolute top-1/2 translate-y-[-50%] w-full h-[2px]"
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
                        className={el <= activeStep ? styles.stepDone : styles.stepNotDone}
                        style={{ transform: el === activeStep ? 'scale(2)' : '' }}
                    ></span>
                    <p className={el <= activeStep ? styles.activeLabel : styles.label}>{stepNames[i]}</p>
                </div>
            ))}
        </div>
    );
}

export default ProgressBar;
