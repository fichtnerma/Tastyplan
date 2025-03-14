import { useEffect, useState } from 'react';
import styles from '../ProgressBar/ProgressBar.module.scss';

type Props = {
    stepNames: string[];
    activeStep: number;
    stepIsDone: boolean;
    onClick: (elementName: string) => void;
};

function ProgressBar({ stepNames, activeStep, stepIsDone, onClick }: Props) {
    const [numbersArr, setNumbersArr] = useState<number[]>([]);

    useEffect(() => {
        const numbersAsArr = Array.from(Array(stepNames.length + 1).keys());
        numbersAsArr.shift();
        setNumbersArr([...numbersAsArr]);
    }, [activeStep, stepNames]);

    const getGradient = (stepsCount: number, activeStep: number) => {
        return Math.floor(((activeStep - 1) / (stepsCount - 1)) * 100);
    };

    const getStepClass = (elNr: number) => {
        if (elNr <= activeStep) return styles.stepDone;

        if (!stepIsDone) return `${styles.stepNotDone} + ${styles.stepDisabled}`;
        else return styles.stepNotDone;
    };

    const handleStepClick = (e: React.MouseEvent) => {
        if (!stepIsDone) return;

        const element = e.target as HTMLElement;
        const elementName = element.getAttribute('data-step-name');
        if (elementName) onClick(elementName);
    };

    const handleStepKeyDown = (e: React.KeyboardEvent) => {
        if (!stepIsDone) return;

        if (e.key === 'Enter' || e.key === ' ') {
            const element = e.target as HTMLElement;
            const elementName = element.getAttribute('data-step-name');
            if (elementName) onClick(elementName);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex justify-between items-center relative w-5/6 lg:w-full" onClick={handleStepClick}>
                <div
                    className="absolute top-1/2 translate-y-[-50%] w-full h-[3px]"
                    data-testid="progress-bar"
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
                            data-testid={stepNames[i]}
                            className={getStepClass(el)}
                            style={{ transform: el === activeStep ? 'scale(2)' : '' }}
                            tabIndex={0}
                            role="button"
                            aria-label={stepNames[i]}
                            onKeyDown={(event) => {
                                handleStepKeyDown(event);
                            }}
                        ></span>
                        <p className={`hidden lg:block ${el <= activeStep ? styles.activeLabel : styles.label}`}>
                            {stepNames[i]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgressBar;
