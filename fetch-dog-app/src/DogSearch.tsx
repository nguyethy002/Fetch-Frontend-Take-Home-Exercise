import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Button, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, SelectChangeEvent } from '@mui/material';

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

    useEffect(() => {
        // Fetch dog breeds
        const fetchBreeds = async () => {
            const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds');
            setBreeds(response.data);
        };
        fetchBreeds();
    }, []);

    const fetchDogs = async () => {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
            params: {
                breeds: selectedBreed ? [selectedBreed] : [],
                sort: `breed:${sortOrder}`,
                size: 25,
            },
            withCredentials: true,
        });
        setDogs(response.data.results);
    };

    useEffect(() => {
        fetchDogs();
    }, [selectedBreed, sortOrder]);

    const handleFavorite = (dogId: string) => {
        setFavorites((prev) => (prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]));
    };

    const generateMatch = async () => {
        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, {
                withCredentials: true,
            });
            alert(`Matched with dog ID: ${response.data.match}`);
        } catch (error) {
            console.error('Error generating match', error);
        }
    };

    const handleSortOrderChange = (e: SelectChangeEvent<"asc" | "desc">) => {
        // Type assertion to ensure the value is treated as 'asc' | 'desc'
        setSortOrder(e.target.value as "asc" | "desc");
    };

    const handleBreedChange = (e: SelectChangeEvent<string>) => {
        setSelectedBreed(e.target.value);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Breed</InputLabel>
                        <Select value={selectedBreed} onChange={handleBreedChange} label="Breed">
                            {breeds.map((breed) => (
                                <MenuItem key={breed} value={breed}>
                                    {breed}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Sort Order</InputLabel>
                        <Select value={sortOrder} onChange={handleSortOrderChange} label="Sort Order">
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {dogs.map((dog) => (
                    <Grid item xs={12} sm={4} key={dog.id}>
                        <Card>
                            <img src={dog.img} alt={dog.name} />
                            <CardContent>
                                <Typography variant="h6">{dog.name}</Typography>
                                <Typography variant="body2">Age: {dog.age}</Typography>
                                <Typography variant="body2">Breed: {dog.breed}</Typography>
                                <Button onClick={() => handleFavorite(dog.id)}>{favorites.includes(dog.id) ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="secondary" onClick={generateMatch} style={{ marginTop: '2rem' }}>
                Generate Match
            </Button>
        </Container>
    );
};

export default DogSearch;
