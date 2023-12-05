import { useState } from 'react';
import Icon from '@components/Icon/Icon';

const Keyfacts = () => {
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(1);
    return (
        <fieldset>
            <legend className="h1">Add the key facts</legend>
            <div className="flex flex-col mb-7">
                <label htmlFor="cookingTime">How long will it take you in minutes?</label>
                <input
                    className="border-2 border-green-custom2"
                    type="number"
                    name="cookingTime"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(parseInt(e.target.value))}
                    required
                    min={0}
                />
            </div>
            <div>
                <label className="block mb-2" htmlFor="servings">
                    Portions
                </label>
                <div className="flex mb-7">
                    <button
                        type="button"
                        className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0"
                        onClick={() => setServings(servings - 1)}
                    >
                        <Icon icon="minus" size={19} />
                    </button>
                    <p className="text-base w-10 text-center text-green-custom2" id="portion" data-cy="portion-amount">
                        {servings}
                    </p>
                    <button
                        type="button"
                        className="btn-primary !flex justify-center items-center !w-[25px] !h-[25px] !p-0 mr-5"
                        onClick={() => setServings(servings + 1)}
                    >
                        <Icon icon="plus" size={19} />
                    </button>
                </div>
                <div>
                    <label htmlFor="">Set the diet</label>
                </div>
            </div>
        </fieldset>
    );
};

export default Keyfacts;
