import {
    Button, Card, CardContent, Typography, Grid
} from '@mui/material';
import { Dog } from '../types/types';
export const DogCard = ({ dog, isFavorite, onFavorite }: { dog: Dog; isFavorite: boolean; onFavorite: (id: string) => void }) => (
    <Grid item xs={12} sm={4}>
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
                    color={isFavorite ? 'secondary' : 'primary'}
                    onClick={() => onFavorite(dog.id)}
                    fullWidth
                    style={{ marginTop: 'auto' }}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </CardContent>
        </Card>
    </Grid>
);
