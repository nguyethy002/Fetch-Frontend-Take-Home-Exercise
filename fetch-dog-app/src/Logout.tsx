import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
    const logout = async () => {
        try {
            await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
            alert('Logged out successfully.');
            // Redirect to login page after logout
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={logout} style={{ marginBottom: '20px' }}>
            Logout
        </Button>
    );
};

export default LogoutButton;
