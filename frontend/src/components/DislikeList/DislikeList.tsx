import Image from 'next/image';
import { APISearchResponse } from 'src/types/types';
import cross from '../../../public/Icons/kreuz.png';

type DislikeListProps = {
    dislikes: APISearchResponse[] | Allergen[];
    onDeleteChoice: (dislikeName: string) => void;
};

type Allergen = {
    name: string;
};

export default function DislikeList({ dislikes, onDeleteChoice }: DislikeListProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {dislikes.map((dislike, i) => (
                <div
                    key={i}
                    className="inline-block border-2 border-solid border-green-custom2 rounded-[50px] bg-green-custom1 overflow-hidden whitespace-nowrap w-max py-[5px] px-[7px]"
                >
                    <span>
                        <label className="flex items-center" htmlFor={dislike.name}>
                            <p className="inline-block pr-2 max-w-[300px] truncate text-sm">
                                {dislike.name.charAt(0).toUpperCase() + dislike.name.slice(1)}
                            </p>

                            <a
                                className="inline-block cursor-pointer"
                                onClick={() => onDeleteChoice(dislike.name)}
                                data-anchor={dislike.name}
                            >
                                <Image src={cross} className="" alt="cross" width={12} priority />
                            </a>
                        </label>
                    </span>
                </div>
            ))}
        </div>
    );
}
