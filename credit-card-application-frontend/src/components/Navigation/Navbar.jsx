import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
                        >
                            CREDIT CARD APP
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit" onClick={() => navigate('/applicant')}>
                                Applicant View
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/approver')}>
                                Approver View
                            </Button>
                            <Button color="inherit" onClick={() => {
                                localStorage.removeItem('isLoggedIn');
                                navigate('/');
                            }}>
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;
