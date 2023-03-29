type OnBackFunction = () => void;
interface DislikesProps {
    onBack: OnBackFunction;
}

export default function Dislikes({ onBack }: DislikesProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onBack();
    };
    return (
        <div className="flex justify-between relative">
            <button type="submit" className="btn-primary mt-10" data-btn="back" onClick={handleClick}>
                Back
            </button>
            <button type="submit" className="btn-primary mt-10" data-btn="next" onClick={handleClick}>
                Next
            </button>
        </div>
    );
}
