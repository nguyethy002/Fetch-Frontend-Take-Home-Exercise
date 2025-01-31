import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Container, Grid, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, CircularProgress
} from '@mui/material';

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const DogSearch = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const pageSize = 25;

    // Fetch breeds and dog details
    const fetchBreeds = useCallback(async () => {
        try {
            setLoading(true); // Set loading to true when starting the fetch
            const { data } = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                withCredentials: true,
            });
            setBreeds(data);
        } catch (error) {
            console.error('Error fetching breeds:', error);
        } finally {
            setLoading(false); // Set loading to false when fetch is done
        }
    }, []);

    const fetchDogs = useCallback(async () => {
        try {
            setLoading(true); // Set loading to true when starting the fetch
            const { data: searchData } = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
                params: {
                    breeds: selectedBreed ? [selectedBreed] : [],
                    sort: `breed:${sortOrder}`,
                    size: pageSize,
                    from: page * pageSize,
                },
                withCredentials: true,
            });

            if (Array.isArray(searchData.resultIds)) {
                const { data: dogsData } = await axios.post('https://frontend-take-home-service.fetch.com/dogs', searchData.resultIds, {
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
            setLoading(false); // Set loading to false when fetch is done
        }
    }, [selectedBreed, sortOrder, page]);

    useEffect(() => {
        fetchBreeds();
    }, [fetchBreeds]);

    useEffect(() => {
        fetchDogs();
    }, [fetchDogs]);

    const handleFavorite = useCallback((dogId: string) => {
        setFavorites(prev =>
            prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
        );
    }, []);

    const generateMatch = useCallback(async () => {
        if (favorites.length === 0) {
            alert("Please select at least one favorite dog before matching.");
            return;
        }

        try {
            const { data } = await axios.post(
                'https://frontend-take-home-service.fetch.com/dogs/match',
                favorites, 
                { withCredentials: true }
            );
            alert(`Matched with dog ID: ${data.match}`);
        } catch (error) {
            console.error('Error generating match', error);
            alert('Failed to generate match. Please try again.');
        }
    }, [favorites]);

    return (
        <Container>
            {loading ? ( // Show loading spinner if data is loading
                <CircularProgress size={50} style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />
            ) : (
                <>
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

                    <Grid container spacing={3} style={{ marginTop: '2rem' }}>
                        {dogs.map((dog) => (
                            <Grid item xs={12} sm={4} key={dog.id}>
                                <Card elevation={3} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <img 
                                        src={dog.img} 
                                        alt={dog.name} 
                                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} 
                                    />
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{dog.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">Age: {dog.age}</Typography>
                                        <Typography variant="body2" color="textSecondary">Breed: {dog.breed}</Typography>
                                        <Typography variant="body2" color="textSecondary">Location: {dog.zip_code}</Typography>
                                        <Button 
                                            variant="outlined" 
                                            color={favorites.includes(dog.id) ? 'secondary' : 'primary'} 
                                            onClick={() => handleFavorite(dog.id)} 
                                            fullWidth
                                            style={{ marginTop: 'auto' }}
                                        >
                                            {favorites.includes(dog.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '2rem' }}>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                disabled={page === 0} 
                                onClick={() => setPage(prev => Math.max(prev - 1, 0))} 
                                style={{ padding: '10px 20px' }}
                            >
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color ="black">Page {page + 1}</Typography>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => setPage(prev => prev + 1)} 
                                style={{ padding: '10px 20px' }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={generateMatch} 
                        fullWidth 
                        style={{ marginTop: '2rem', padding: '10px' }}
                    >
                        Generate Match
                    </Button>
                </>
            )}
        </Container>
    );
};

export default DogSearch;
