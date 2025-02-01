import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, CircularProgress, Grid
} from '@mui/material';
import { DogCard } from './DogCard';
import { Dog } from './types/types';

// API Base URL
const API_BASE_URL = 'https://frontend-take-home-service.fetch.com/dogs';
const AUTH_API_URL = 'https://frontend-take-home-service.fetch.com/auth/logout';

const DogSearch = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const pageSize = 25;

    // Fetch breeds on mount
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API_BASE_URL}/breeds`, { withCredentials: true });
                setBreeds(data);
            } catch (error) {
                console.error('Error fetching breeds:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBreeds();
    }, []);

    // Fetch dogs when filters change
    useEffect(() => {
        const fetchDogs = async () => {
            try {
                setLoading(true);
                const { data: searchData } = await axios.get(`${API_BASE_URL}/search`, {
                    params: {
                        breeds: selectedBreed ? [selectedBreed] : [],
                        sort: `breed:${sortOrder}`,
                        size: pageSize,
                        from: page * pageSize,
                    },
                    withCredentials: true,
                });

                if (Array.isArray(searchData.resultIds)) {
                    const { data: dogsData } = await axios.post(`${API_BASE_URL}`, searchData.resultIds, {
                        withCredentials: true,
                    });
                    setDogs(Array.isArray(dogsData) ? dogsData : []);
                } else {
                    setDogs([]);
                }
            } catch (error) {
                console.error('Error fetching dogs:', error);
                setDogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDogs();
    }, [selectedBreed, sortOrder, page]);

    // Toggle favorites
    const handleFavorite = (dogId: string) => {
        setFavorites((prev) =>
            prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
        );
    };

    // Generate match
    const generateMatch = async () => {
        if (favorites.length === 0) {
            alert("Please select at least one favorite dog before matching.");
            return;
        }

        try {
            const { data } = await axios.post(`${API_BASE_URL}/match`, favorites, { withCredentials: true });
            alert(`Matched with dog ID: ${data.match}`);
        } catch (error) {
            console.error('Error generating match', error);
            alert('Failed to generate match. Please try again.');
        }
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await axios.post(AUTH_API_URL, {}, { withCredentials: true });
            alert("Logged out successfully!");
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <Container>
            <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginBottom: '1rem', marginLeft: 'auto', display: 'block' }}>
                Logout
            </Button>
            {loading ? (
                <CircularProgress size={50} style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />
            ) : (
                <>
                    {/* Filters */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Breed</InputLabel>
                                <Select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)} label="Breed">
                                    {breeds.map((breed) => (
                                        <MenuItem key={breed} value={breed}>{breed}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Sort Order</InputLabel>
                                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")} label="Sort Order">
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Dog List */}
                    <Grid container spacing={3} style={{ marginTop: '2rem' }}>
                        {dogs.map((dog) => (
                            <DogCard key={dog.id} dog={dog} isFavorite={favorites.includes(dog.id)} onFavorite={handleFavorite} />
                        ))}
                    </Grid>

                    {/* Pagination */}
                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '2rem' }}>
                        <Grid item>
                            <Button variant="contained" color="primary" disabled={page === 0} onClick={() => setPage(page - 1)}>
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="black">Page {page + 1}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Match Button */}
                    <Button variant="contained" color="secondary" onClick={generateMatch} fullWidth style={{ marginTop: '2rem', padding: '10px' }}>
                        Generate Match
                    </Button>
                </>
            )}
        </Container>
    );
};

export default DogSearch;