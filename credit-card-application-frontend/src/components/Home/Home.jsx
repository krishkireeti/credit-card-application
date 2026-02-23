import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Security, Speed, AccountBalance } from '@mui/icons-material';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'primary.main', color: 'white' }}>
            {/* Header */}
            <AppBar position="static" color="primary" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <CreditCard sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
                        >
                            CREDIT CARD APP
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                color="inherit"
                                variant="outlined"
                                sx={{ bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                                onClick={() => navigate('/applicant')}
                            >
                                Apply Credit Card
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                disableElevation
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                pt: 8,
                pb: 12,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                                The Card That Fits Your Lifestyle
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                Experience seamless transactions, exclusive rewards, and world-class security with Elite Credit.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{ py: 1.5, px: 4, borderRadius: 2, fontSize: '1.1rem' }}
                                onClick={() => navigate('/applicant')}
                            >
                                Get Started
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            {/* Decorative Card Graphic */}
                            <Box sx={{
                                width: 340,
                                height: 215,
                                borderRadius: 4,
                                background: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(255,255,255,0.1)'
                                }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ letterSpacing: 2 }}>ELITE</Typography>
                                    <Security />
                                </Box>
                                <Box>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        <Box sx={{ width: 40, height: 25, bgcolor: '#ffd700', borderRadius: 1 }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ letterSpacing: 4, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                                        **** **** **** 4242
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="caption">CARD HOLDER</Typography>
                                    <Typography variant="caption">EXPIRES 12/28</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
                <Typography variant="h3" align="center" fontWeight="bold" gutterBottom color="text.primary">
                    Why Choose Elite?
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                        <Card elevation={0} sx={{ height: '100%', textAlign: 'center', p: 2, bgcolor: 'transparent' }}>
                            <Speed sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h5" gutterBottom fontWeight="bold">Instant Decisions</Typography>
                            <Typography color="text.secondary">
                                Apply online in minutes and get an instant decision on your credit card application.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card elevation={0} sx={{ height: '100%', textAlign: 'center', p: 2, bgcolor: 'transparent' }}>
                            <Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h5" gutterBottom fontWeight="bold">Secure & Safe</Typography>
                            <Typography color="text.secondary">
                                Top-tier encryption and fraud protection to keep your financial data safe at all times.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card elevation={0} sx={{ height: '100%', textAlign: 'center', p: 2, bgcolor: 'transparent' }}>
                            <AccountBalance sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h5" gutterBottom fontWeight="bold">Global Acceptance</Typography>
                            <Typography color="text.secondary">
                                Use your Elite Credit Card at millions of locations worldwide with no foreign transaction fees.
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
