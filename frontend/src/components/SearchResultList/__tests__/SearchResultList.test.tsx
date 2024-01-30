import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import SearchResultList from '../SearchResultList';

describe('SearchResultList', () => {
    const mockSearchResults = [
        { id: 1, name: 'Result 1' },
        { id: 2, name: 'Result 2' },
    ];

    it.skip('should not have basic accessibility issues', async () => {
        const mockClickHandler = jest.fn();
        const mockDislikes = [
            { id: 1, name: 'Test Dislike 1' },
            { id: 2, name: 'Test Dislike 2' },
        ];

        const { container } = render(
            <SearchResultList
                searchResults={mockSearchResults}
                clickHandler={mockClickHandler}
                dislikes={mockDislikes}
            />,
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders without crashing', () => {
        const mockProps = {
            searchResults: mockSearchResults,
            clickHandler: jest.fn(),
            dislikes: [],
        };

        const { container } = render(<SearchResultList {...mockProps} />);
        expect(container).toBeTruthy();
    });

    it('renders a list of search results', () => {
        const mockProps = {
            searchResults: mockSearchResults,
            clickHandler: jest.fn(),
            dislikes: [],
        };

        const { getByText } = render(<SearchResultList {...mockProps} />);
        expect(getByText('Result 1')).toBeInTheDocument();
        expect(getByText('Result 2')).toBeInTheDocument();
    });

    it('calls clickHandler when a search result item is clicked', () => {
        const mockProps = {
            searchResults: mockSearchResults,
            clickHandler: jest.fn(),
            dislikes: [],
        };

        const { getByText } = render(<SearchResultList {...mockProps} />);
        const resultItem = getByText('Result 1');
        fireEvent.click(resultItem);
        expect(mockProps.clickHandler).toHaveBeenCalled();
    });

    it('applies styling based on dislikes', () => {
        const mockProps = {
            searchResults: mockSearchResults,
            clickHandler: jest.fn(),
            dislikes: [{ id: 1, name: 'Result 1' }],
        };

        const { getByText } = render(<SearchResultList {...mockProps} />);
        const resultItem = getByText('Result 1');
        expect(resultItem).toHaveClass('bg-gray-custom5');
    });
});
