import React from 'react';
import SearchResultlist from '@components/SearchResultList/SearchResultList';
import Icon from '@components/Icon/Icon';
import TextInput from '@components/FormInputs/TextInput';
import { APISearchResponse } from 'src/types/types';

type DislikeSearchProps = {
    searchTerm: string;
    searchResult: APISearchResponse[];
    isInputFocus: boolean;
    deleteInput: () => void;
    searchChanged: (value: string) => void;
    handleAddChoice: (e: React.MouseEvent) => void;
    allDislikes: APISearchResponse[];
    onFocus: () => void;
};

function DislikeSearch({
    searchTerm,
    searchResult,
    isInputFocus,
    deleteInput,
    searchChanged,
    handleAddChoice,
    allDislikes,
    onFocus,
}: DislikeSearchProps) {
    return (
        <div>
            <div className="text-input-wrapper w-full">
                <TextInput
                    placeholder="Search ingredients"
                    value={searchTerm}
                    decoration={
                        <button className="mb-2" type="button" onClick={deleteInput} aria-label="search">
                            {searchTerm == '' ? <Icon size={20} icon="search" /> : <Icon size={20} icon="close" />}
                        </button>
                    }
                    decorationPosition="end"
                    onChange={searchChanged}
                    onFocus={onFocus}
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
