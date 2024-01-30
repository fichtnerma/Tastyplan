import Icon from '@components/Icon/Icon';
import { APISearchResponse } from 'src/types/types';

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
                            <p
                                className="inline-block pr-2 max-w-[300px] truncate text-sm"
                                data-cy={`selected-dislike-text-${dislike.name}`}
                            >
                                {dislike.name.charAt(0).toUpperCase() + dislike.name.slice(1)}
                            </p>

                            <a
                                data-testid={`remove-${dislike.name}`}
                                className="cursor-pointer"
                                onClick={() => onDeleteChoice(dislike.name)}
                                data-anchor={dislike.name}
                                data-cy={`remove-${dislike.name}`}
                            >
                                <Icon icon="close"></Icon>
                            </a>
                        </label>
                    </span>
                </div>
            ))}
        </div>
    );
}
