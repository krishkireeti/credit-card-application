import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, Chip, Stack
} from '@mui/material';
import StatusModal from '../Status/StatusModal';
import api from '../../api/api';

const mapAppFromApi = (app) => ({
    id: app._id,
    name: app.fullName,
    age: app.age,
    income: app.income,
    pan: app.pan,
    score: app.creditScore ?? null,
    status: app.status || 'Pending'
});

const ApproverDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalConfig, setModalConfig] = useState({
        open: false,
        type: 'success',
        title: '',
        message: ''
    });

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/api/approver');
            setApplications((response.data || []).map(mapAppFromApi));
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleCheckScore = async (id) => {
        const app = applications.find(a => a.id === id);
        if (!app) return;
        const mockScore = app.income > 500000 ? 820 : 710;
        try {
            const response = await api.put(`/api/approver/${id}`, { score: mockScore });
            setApplications(prev => prev.map(a => a.id === id ? { ...a, score: response.data.creditScore ?? mockScore } : a));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update score');
        }
    };

    const handleDecision = async (id, name, decision) => {
        const isApproved = decision === 'Approved';
        try {
            await api.put(`/api/approver/${id}`, { status: decision });
            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status: decision } : app
            ));
            setModalConfig({
                open: true,
                type: isApproved ? 'success' : 'error',
                title: isApproved ? 'Application Approved' : 'Application Rejected',
                message: isApproved
                    ? `Credit card for ${name} has been approved and moved to the dispatch queue.`
                    : `Application for ${name} has been rejected based on credit policy.`
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update application');
        }
    };

    const closeModal = () => setModalConfig({ ...modalConfig, open: false });

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Admin Dashboard</Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {loading ? (
                <Typography>Loading applications...</Typography>
            ) : (
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, mt: 3 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell>Applicant</TableCell>
                                <TableCell>Income</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No applications found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2">{row.name}</Typography>
                                            <Typography variant="caption">{row.pan ? `****${String(row.pan).slice(-4)}` : '—'}</Typography>
                                        </TableCell>
                                        <TableCell>₹{Number(row.income || 0).toLocaleString()}</TableCell>
                                        <TableCell>
                                            {row.score ? (
                                                <Chip label={row.score} color={row.score >= 800 ? "success" : "warning"} size="small" />
                                            ) : (
                                                <Button size="small" onClick={() => handleCheckScore(row.id)}>Check</Button>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={row.status} size="small" variant="outlined" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    disabled={row.status !== 'Pending'}
                                                    onClick={() => handleDecision(row.id, row.name, 'Approved')}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    disabled={row.status !== 'Pending'}
                                                    onClick={() => handleDecision(row.id, row.name, 'Rejected')}
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Reusable Modal Component */}
            <StatusModal
                open={modalConfig.open}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
                onClose={closeModal}
            />
        </Container>
    );
};

export default ApproverDashboard;