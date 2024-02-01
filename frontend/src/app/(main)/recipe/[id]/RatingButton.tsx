import React, { useState } from 'react';
import Icon from '@components/Icon/Icon';
const ratingStarsId = [1, 2, 3, 4, 5];
export default function RatingButton() {
    const [rating, setRating] = useState(0);
    const rate = (index: number) => {
        setRating(index);
    };
    return (
        <div>
            <p className="text-center">How do you rate the recipe?</p>
            <div className="flex justify-center mt-5">
                {ratingStarsId.map((e, i) => {
                    if (i < rating)
                        return (
                            <button
                                data-testid="star-icon"
                                key={e}
                                className="fill-green-custom2 text-green-custom2"
                                onClick={() => rate(i + 1)}
                            >
                                <Icon key={e} size={50} icon="star" />
                            </button>
                        );
                    else
                        return (
                            <button
                                data-testid="star-icon"
                                key={e}
                                className="fill-none hover:fill-green-custom1 text-green-custom2"
                                onClick={() => rate(i + 1)}
                            >
                                <Icon key={e} size={50} icon="star" />
                            </button>
                        );
                })}
            </div>
        </div>
    );
}
