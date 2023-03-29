import { useState } from 'react';

type OnBackFunction = () => void;
interface DislikesProps {
    onBack: OnBackFunction;
}

export default function Dislikes({ onBack }: DislikesProps) {
    const [dislike, setDislike] = useState('Search');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onBack();
    };
    return (
        <div>
            <h4 className="mb-8">What food do you dislike?</h4>
            <div className="h-[300px] overflow-y-auto">
                <div className="flex">
                    <div className="text-input-wrapper w-1/2 mr-16">
                        <input type="text" name="search" value={dislike} onChange={(e) => setDislike(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-primary">
                        Go
                    </button>
                </div>
            </div>
            <div className="flex justify-between relative">
                <button type="submit" className="btn-primary mt-10" data-btn="back" onClick={handleClick}>
                    Back
                </button>
                <button type="submit" className="btn-primary mt-10" data-btn="next" onClick={handleClick}>
                    Next
                </button>
            </div>
        </div>
    );
}
