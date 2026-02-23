import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, TextField, Button, Grid, Typography, CircularProgress, Box } from '@mui/material';
// import { applyForCard } from '../actions/cardActions';
// import StatusModal from '../components/StatusModal';

const ApplyCard = () => {
    const [formData, setFormData] = useState({ fullName: '', income: '', age: '', pan: '' });
    // const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    // const { loading, isSuccess, error } = useSelector(state => state.card);

    /*   useEffect(() => {
          if (isSuccess || error) setOpen(true);
      }, [isSuccess, error]); */

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Quick frontend validation for the Hackathon
        if (formData.age < 18) {
            alert("Minimum age is 18");
            return;
        }
        // dispatch(applyForCard(formData));
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
                                <TextField fullWidth label="Full Name" name="fullName" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Age" name="age" type="number" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="PAN Card" name="pan" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Annual Income" name="income" type="number" onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    // disabled={loading}
                                    sx={{ height: 50, mt: 2 }}
                                >
                                    {/* {loading ? <CircularProgress size={24} /> : "Submit Application"} */}
                                    Submit Application
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {/* Logic to show your Modals */}
                {/*   {isSuccess && <StatusModal open={open}
                onClose={() => setOpen(false)} type="success" title="Submitted!" message="Your application is under review." />}
            {error && <StatusModal open={open} onClose={() => setOpen(false)} type="error" title="Failed" message={error} />} */}
            </Container>
        </Box>
    );
};

export default ApplyCard;