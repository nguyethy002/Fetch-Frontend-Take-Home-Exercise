import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DogSearch } from './DogSearch';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

// Setup a mock for axios
const mockAxios = new MockAdapter(axios);

describe('DogSearch Component', () => {
    beforeEach(() => {
        // Mock successful response for breeds
        mockAxios.onGet('https://frontend-take-home-service.fetch.com/dogs/breeds').reply(200, ['Labrador', 'Beagle', 'Poodle']);

        // Mock successful response for dog search
        mockAxios.onGet('https://frontend-take-home-service.fetch.com/dogs/search').reply(200, {
            resultIds: ['1', '2'],
        });

        // Mock successful response for dog details
        mockAxios.onPost('https://frontend-take-home-service.fetch.com/dogs').reply(200, [
            { id: '1', img: '', name: 'Buddy', age: 3, zip_code: '12345', breed: 'Labrador' },
            { id: '2', img: '', name: 'Max', age: 4, zip_code: '67890', breed: 'Beagle' },
        ]);

        // Mock successful response for match
        mockAxios.onPost('https://frontend-take-home-service.fetch.com/dogs/match').reply(200, { match: '1' });
    });

    test('renders and fetches breeds', async () => {
        render(<DogSearch />);

        // Wait for the dropdown to load
        await waitFor(() => screen.getByText('Breed'));

        const breedSelect = screen.getByLabelText('Breed');
        expect(breedSelect).toBeInTheDocument();

        // Check that the breed options are loaded
        const labradorOption = screen.getByText('Labrador');
        expect(labradorOption).toBeInTheDocument();
    });

    test('can select breed and fetch dogs', async () => {
        render(<DogSearch />);

        // Wait for the breed select to be available and select an option
        await waitFor(() => screen.getByLabelText('Breed'));
        fireEvent.change(screen.getByLabelText('Breed'), { target: { value: 'Labrador' } });

        // Wait for the dogs to be fetched and displayed
        await waitFor(() => screen.getByText('Buddy')); // Check for the dog name

        expect(screen.getByText('Buddy')).toBeInTheDocument();
        expect(screen.getByText('Max')).toBeInTheDocument();
    });

    test('can add dog to favorites', async () => {
        render(<DogSearch />);

        // Wait for the dog cards to load
        await waitFor(() => screen.getByText('Buddy'));

        // Click "Add to Favorites" button
        const addToFavoritesButton = screen.getByText('Add to Favorites');
        fireEvent.click(addToFavoritesButton);

        // Check that the button text has changed to "Remove from Favorites"
        expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
    });

    test('can navigate pages', async () => {
        render(<DogSearch />);

        // Wait for the dog cards to load
        await waitFor(() => screen.getByText('Buddy'));

        // Check for next button
        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        // Check that the page number is updated
        await waitFor(() => screen.getByText('Page 2'));
        expect(screen.getByText('Page 2')).toBeInTheDocument();
    });

    test('can generate match with selected favorites', async () => {
        window.alert = jest.fn(); // Mock alert

        render(<DogSearch />);

        // Wait for the dog cards to load
        await waitFor(() => screen.getByText('Buddy'));

        // Add dog to favorites
        const addToFavoritesButton = screen.getByText('Add to Favorites');
        fireEvent.click(addToFavoritesButton);

        // Click generate match button
        const generateMatchButton = screen.getByText('Generate Match');
        fireEvent.click(generateMatchButton);

        // Check that the match alert is triggered
        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Matched with dog ID: 1'));
    });

    test('shows loading spinner when fetching data', async () => {
        render(<DogSearch />);

        // Verify loading spinner is displayed initially
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
