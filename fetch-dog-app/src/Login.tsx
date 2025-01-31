import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        try {
            await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
                name,
                email,
            }, {
                withCredentials: true,
            });
            onLogin();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" color="black">Login</Typography>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '1rem' }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '1rem' }}>
                Login
            </Button>
        </Container>
    );
};

export default Login;
