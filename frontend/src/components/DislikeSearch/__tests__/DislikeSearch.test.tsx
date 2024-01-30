import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import { APISearchResponse } from 'src/types/types';
import DislikeSearch from '../DislikeSearch';
describe('DislikeSearch', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it.skip('should not have basic accessibility issues', async () => {
        const mockDeleteInput = jest.fn();
        const mockSearchChanged = jest.fn();
        const mockHandleAddChoice = jest.fn();
        const mockOnFocus = jest.fn();
        const mockSearchTerm = 'brussel';
        const mockSearchResult: APISearchResponse[] = [
            { id: 612, name: 'brussels sprouts, steamed' },
            { id: 613, name: 'brussels sprouts, raw' },
        ];
        const mockAllDislikes: APISearchResponse[] = [];

        const { container } = render(
            <DislikeSearch
                searchTerm={mockSearchTerm}
                searchResult={mockSearchResult}
                isInputFocus={false}
                deleteInput={mockDeleteInput}
                searchChanged={mockSearchChanged}
                handleAddChoice={mockHandleAddChoice}
                allDislikes={mockAllDislikes}
                onFocus={mockOnFocus}
            />,
        );

        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
    });

    it('renders without crashing', () => {
        const mockProps = {
            searchTerm: '',
            searchResult: [],
            isInputFocus: false,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { container } = render(<DislikeSearch {...mockProps} />);
        expect(container).toBeTruthy();
    });

    it('renders a search input with a placeholder', () => {
        const mockProps = {
            searchTerm: 'Test Search',
            searchResult: [],
            isInputFocus: false,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { getByPlaceholderText } = render(<DislikeSearch {...mockProps} />);
        const searchInput = getByPlaceholderText('Search ingredients');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput.value).toBe('Test Search');
    });

    it('renders a search result list when there are search results and input is focused', () => {
        const mockProps = {
            searchTerm: 'brussel',
            searchResult: [
                { id: 612, name: 'brussels sprouts, steamed' },
                { id: 613, name: 'brussels sprouts, raw' },
            ],
            isInputFocus: true,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { getByText } = render(<DislikeSearch {...mockProps} />);
        expect(getByText('brussels sprouts, steamed')).toBeInTheDocument();
        expect(getByText('brussels sprouts, raw')).toBeInTheDocument();
    });

    it('calls deleteInput when the delete button is clicked', () => {
        const mockProps = {
            searchTerm: 'Test Search',
            searchResult: [],
            isInputFocus: false,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { getByRole } = render(<DislikeSearch {...mockProps} />);
        const deleteButton = getByRole('button');
        fireEvent.click(deleteButton);
        expect(mockProps.deleteInput).toHaveBeenCalled();
    });

    it('calls searchChanged when the search input value changes', () => {
        const mockProps = {
            searchTerm: 'Test Search',
            searchResult: [],
            isInputFocus: false,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { getByPlaceholderText } = render(<DislikeSearch {...mockProps} />);
        const searchInput = getByPlaceholderText('Search ingredients');
        fireEvent.change(searchInput, { target: { value: 'New Value' } });
        expect(mockProps.searchChanged).toHaveBeenCalledWith('New Value');
    });

    it('calls onFocus when the search input is focused', () => {
        const mockProps = {
            searchTerm: 'Test Search',
            searchResult: [],
            isInputFocus: false,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { getByPlaceholderText } = render(<DislikeSearch {...mockProps} />);
        const searchInput = getByPlaceholderText('Search ingredients');
        fireEvent.focus(searchInput);
        expect(mockProps.onFocus).toHaveBeenCalled();
    });

    it('calls handleAddChoice when a search result item is clicked', () => {
        const mockProps = {
            searchTerm: 'Test Search',
            searchResult: [
                { id: 1, name: 'Result 1' },
                { id: 2, name: 'Result 2' },
            ],
            isInputFocus: true,
            deleteInput: jest.fn(),
            searchChanged: jest.fn(),
            handleAddChoice: jest.fn(),
            allDislikes: [],
            onFocus: jest.fn(),
        };

        const { getByText } = render(<DislikeSearch {...mockProps} />);
        const resultItem = getByText('Result 1');
        fireEvent.click(resultItem);
        expect(mockProps.handleAddChoice).toHaveBeenCalledWith(expect.any(Object));
    });
});
