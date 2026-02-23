import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#1a237e',
                color: 'white',
                pt: 8,
                pb: 4,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: '1px' }}>
                            ELITE CARD
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.8 }}>
                            Providing premium financial solutions for a modern lifestyle.
                            Our Elite Credit Card offers unparalleled rewards and security
                            tailored to your success.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                                <Facebook fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                                <Twitter fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                                <LinkedIn fontSize="small" />
                            </IconButton>
                            <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                                <Instagram fontSize="small" />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Link href="/" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Home</Link>
                            <Link href="/apply" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Apply Now</Link>
                            <Link href="/status" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Check Status</Link>
                            <Link href="/login" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Approver Login</Link>
                        </Box>
                    </Grid>

                    {/* Support */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Support
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Help Center</Link>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Privacy Policy</Link>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Terms of Service</Link>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.8, '&:hover': { opacity: 1, color: 'primary.light' } }}>Security</Link>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Phone sx={{ fontSize: 20, color: 'primary.light' }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>1-800-ELITE-CARD</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Email sx={{ fontSize: 20, color: 'primary.light' }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>support@elitecard.com</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LocationOn sx={{ fontSize: 20, color: 'primary.light' }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>123 Financial District, New York, NY 10001</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        © {new Date().getFullYear()} Elite Credit Application. All rights reserved.
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        Designed with excellence for a premium experience.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
