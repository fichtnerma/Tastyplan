import React from 'react';
import Image from 'next/image';
import SearchResultlist from '@components/SearchResultList/SearchResultList';
import TextInput from '@components/FormInputs/TextInput';
import { APISearchResponse } from 'src/types/types';
import cross from '../../../public/Icons/kreuz.png';

type DislikeSearchProps = {
    searchTerm: string;
    searchResult: APISearchResponse[];
    isInputFocus: boolean;
    deleteInput: () => void;
    searchChanged: (value: string) => void;
    handleAddChoice: (e: React.MouseEvent) => void;
    allDislikes: APISearchResponse[];
};

function DislikeSearch({
    searchTerm,
    searchResult,
    isInputFocus,
    deleteInput,
    searchChanged,
    handleAddChoice,
    allDislikes,
}: DislikeSearchProps) {
    return (
        <div>
            <div className="text-input-wrapper w-full">
                <TextInput
                    placeholder="Search ingredients"
                    value={searchTerm}
                    decoration={
                        <button type="button" onClick={deleteInput}>
                            <Image src={cross} className="pr-1" alt="cross" width={20} priority />
                        </button>
                    }
                    decorationPosition="end"
                    onChange={searchChanged}
                />
                <div className="relative">
                    <div className="absolute z-1 w-full">
                        {searchResult.length !== 0 && isInputFocus === true && (
                            <SearchResultlist
                                searchResults={[...searchResult]}
                                clickHandler={handleAddChoice}
                                dislikes={allDislikes}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DislikeSearch;
