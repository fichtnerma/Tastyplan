export default function ProgressBar({ bgColor, progress }: { bgColor: string; progress: number }) {
    return (
        <div className="h-[20px] w-full bg-gray-300 rounded-lg m-[50px]">
            <div
                className="h-full rounded-[inherit] text-center transition-width duration-500"
                style={{ backgroundColor: bgColor, width: `${progress}%` }}
            >
                {progress > 0 && (
                    <span className="block h-full text-white font-medium leading-[20px]">{`${progress}%`}</span>
                )}
            </div>
        </div>
    );
}
