import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Grid, Typography, CircularProgress, Box, Alert } from '@mui/material';
import api from '../api/api';
import StatusModal from '../components/Status/StatusModal';

const ApplyCard = () => {
    const [formData, setFormData] = useState({ fullName: '', income: '', age: '', pan: '' });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (Number(formData.age) < 18) {
            setError('Minimum age is 18');
            setOpen(true);
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const ageNum = Number(formData.age);
            const incomeNum = Number(formData.income);
            if (Number.isNaN(ageNum) || formData.age === '') {
                setError('Please enter a valid age.');
                setOpen(true);
                setLoading(false);
                return;
            }
            if (Number.isNaN(incomeNum) || formData.income === '') {
                setError('Please enter a valid annual income.');
                setOpen(true);
                setLoading(false);
                return;
            }
            const payload = {
                fullName: formData.fullName.trim(),
                age: ageNum,
                income: incomeNum,
                pan: formData.pan.trim()
            };
            const response = await api.post('/api/applicant', payload);
            setSuccess(true);
            setFormData({ fullName: '', income: '', age: '', pan: '' });
            setOpen(true);
        } catch (err) {
            let message = 'Failed to submit application.';
            if (err.response?.data?.message) {
                message = err.response.data.message;
            } else if (err.code === 'ERR_NETWORK' || !err.response) {
                message = 'Cannot reach server. Make sure the backend is running on http://localhost:5000';
            } else if (err.message) {
                message = err.message;
            }
            setError(message);
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Credit Card Application
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="PAN Card" name="pan" value={formData.pan} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Annual Income" name="income" type="number" value={formData.income} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading}
                                    sx={{ height: 50, mt: 2 }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {success && (
                    <StatusModal open={open} onClose={() => setOpen(false)} type="success" title="Submitted!" message="Your application is under review." />
                )}
                {error && (
                    <StatusModal open={open} onClose={() => { setOpen(false); setError(null); }} type="error" title="Failed" message={error} />
                )}
            </Container>
        </Box>
    );
};

export default ApplyCard;