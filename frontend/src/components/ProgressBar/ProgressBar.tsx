import styles from '../ProgressBar/ProgressBar.module.scss';

import { useEffect, useState } from 'react';

type ProgressBarProps = {
    stepsCount: number;
    activeStep: number;
};

function ProgressBar({ stepsCount, activeStep }: ProgressBarProps) {
    const [numbersArr, setNumbersArr] = useState<number[]>([]);

    useEffect(() => {
        const numbersAsArr = Array.from(Array(stepsCount + 1).keys());
        numbersAsArr.shift();
        setNumbersArr([...numbersAsArr]);
    }, []);

    return (
        <div className="flex justify-between items-center relative w-full">
            <div className="absolute top-1/2 translate-y-[-50%] w-full h-[2px] bg-gray-custom5"></div>
            {numbersArr.map((el) => (
                <span key={el} className={el === activeStep ? styles.active : styles.passive}></span>
            ))}
        </div>
    );
}

export default ProgressBar;
