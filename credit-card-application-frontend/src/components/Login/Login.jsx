import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, Lock, ArrowBack } from '@mui/icons-material';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.username.trim()) tempErrors.username = "Username is required";
        if (!formData.password) tempErrors.password = "Password is required";
        else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus(null);
        if (validate()) {
            console.log("Login Attempt:", formData);
            setSubmitStatus({ type: 'success', message: 'Login successful! Redirecting...' });

            setTimeout(() => {
                localStorage.setItem('isLoggedIn', 'true');
                // If username contains 'admin' or 'approver', go to approver dashboard
                if (formData.username.toLowerCase().includes('admin') || formData.username.toLowerCase().includes('approver')) {
                    navigate('/approver');
                } else {
                    navigate('/applicant');
                }
            }, 1000);
        } else {
            setSubmitStatus({ type: 'error', message: 'Please fix validation errors.' });
        }
    };


    return (
        <div className="login-container">
            <Container component="main" maxWidth="xs">
                <Paper elevation={6} className="login-paper" sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
                    <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                        Login
                    </Typography>

                    {submitStatus && (
                        <Alert severity={submitStatus.type} sx={{ width: '100%', mb: 2 }}>
                            {submitStatus.message}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2, height: 48, fontWeight: 'bold' }}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => navigate('/')}
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;
