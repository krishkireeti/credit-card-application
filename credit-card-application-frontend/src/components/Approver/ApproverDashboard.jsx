import React, { useState } from 'react';
import {
    Container, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, Chip, Stack, Box
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import StatusModal from '../Status/StatusModal';
// Import your reusable modal

const ApproverDashboard = () => {
    // 1. Applications State
    const [applications, setApplications] = useState([
        { id: 'APP101', name: 'Rahul Sharma', age: 25, income: 400000, pan: '**********', score: null, status: 'Pending' },
        { id: 'APP102', name: 'Sita Verma', age: 30, income: 1200000, pan: '**********', score: null, status: 'Pending' },
    ]);

    // 2. Modal State
    const [modalConfig, setModalConfig] = useState({
        open: false,
        type: 'success',
        title: '',
        message: ''
    });

    const handleCheckScore = (id) => {
        setApplications(prev => prev.map(app => {
            if (app.id === id) {
                // Mock score logic
                const mockScore = app.income > 500000 ? 820 : 710;
                return { ...app, score: mockScore };
            }
            return app;
        }));
    };

    // 3. Handle Decision and Trigger Modal
    const handleDecision = (id, name, decision) => {
        const isApproved = decision === 'Approved';

        // Update the table status
        setApplications(prev => prev.map(app =>
            app.id === id ? { ...app, status: decision } : app
        ));

        // Open the success/failure modal
        setModalConfig({
            open: true,
            type: isApproved ? 'success' : 'error',
            title: isApproved ? 'Application Approved' : 'Application Rejected',
            message: isApproved
                ? `Credit card for ${name} has been approved and moved to the dispatch queue.`
                : `Application for ${name} has been rejected based on credit policy.`
        });
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
                                            <Typography variant="caption">{row.pan}</Typography>
                                        </TableCell>
                                        <TableCell>₹{row.income.toLocaleString()}</TableCell>
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