import styles from '../ProgressBar/ProgressBar.module.scss';

import { useEffect, useState } from 'react';

type ProgressBarProps = {
    stepsCount: number;
    activeStep: number;
};

function ProgressBar({ stepsCount, activeStep }: ProgressBarProps) {
    const [numbersArr, setNumbersArr] = useState<number[]>([]);

    const getGradient = (stepsCount: number, activeStep: number) => {
        if (activeStep === 1) return 0;
        if (stepsCount / activeStep === stepsCount / 2) return 50;
        return (activeStep / stepsCount) * 100;
    };

    useEffect(() => {
        const numbersAsArr = Array.from(Array(stepsCount + 1).keys());
        numbersAsArr.shift();
        setNumbersArr([...numbersAsArr]);
    }, [activeStep]);

    return (
        <div className="flex justify-between items-center relative w-full">
            <div
                className="absolute top-1/2 translate-y-[-50%] w-full h-[2px]"
                style={{
                    background: `linear-gradient(to right, var(--green-dark) ${getGradient(
                        stepsCount,
                        activeStep,
                    )}%, var(--gray-5) ${getGradient(stepsCount, activeStep)}%)`,
                }}
            ></div>
            {numbersArr.map((el) => (
                <span
                    key={el}
                    className={el <= activeStep ? styles.done : styles.notDone}
                    style={{ transform: el === activeStep ? 'scale(2)' : 'scale(1)' }}
                ></span>
            ))}
        </div>
    );
}

export default ProgressBar;
