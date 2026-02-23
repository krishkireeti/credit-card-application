import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Chip,
    Alert,
    CircularProgress
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const ApplicationStatus = () => {
    const [searchId, setSearchId] = useState('');
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        setLoading(true);
        setError(null);
        setStatusData(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/applications/${searchId}`);
            setStatusData(response.data);
        } catch (err) {
            console.error("Search error", err);
            setError(err.response?.status === 404
                ? "Application ID not found. Please check and try again."
                : "An error occurred while fetching status.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'SUBMITTED': return <Chip label="Submitted" color="default" />;
            case 'SCORED': return <Chip label="Under Review" color="info" />;
            case 'APPROVED': return <Chip label="Approved" color="success" />;
            case 'REJECTED': return <Chip label="Rejected" color="error" />;
            case 'DISPATCHED': return <Chip label="Dispatched" color="primary" />;
            default: return <Chip label={status} />;
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom color="primary" fontWeight="bold">
                    Check Application Status
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" paragraph>
                    Enter your Application ID below to track your credit card application.
                </Typography>

                <Box component="form" onSubmit={handleSearch} sx={{ mt: 3, display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        label="Application ID"
                        variant="outlined"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="e.g., 65b8..."
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading || !searchId.trim()}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                    >
                        Search
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                )}

                {statusData && (
                    <Card sx={{ mt: 4, bgcolor: '#f8f9fa' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Application Details
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                                <Typography color="text.secondary">Applicant Name:</Typography>
                                <Typography fontWeight="bold">
                                    {statusData.firstName} {statusData.lastName}
                                </Typography>

                                <Typography color="text.secondary">Current Status:</Typography>
                                <Box>
                                    {getStatusChip(statusData.status)}
                                </Box>

                                <Typography color="text.secondary">Message:</Typography>
                                <Typography>
                                    {statusData.status === 'APPROVED' && "Your application has been approved!"}
                                    {statusData.status === 'REJECTED' && "We regret to inform you that your application was not successful."}
                                    {statusData.status === 'DISPATCHED' && "Your card has been dispatched and will arrive shortly."}
                                    {(statusData.status === 'SUBMITTED' || statusData.status === 'SCORED') && "Your application is currently being reviewed."}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Paper>
        </Container>
    );
};

export default ApplicationStatus;
