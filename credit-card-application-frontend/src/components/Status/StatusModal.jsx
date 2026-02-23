import React from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Button,
    Box,
    Fade
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StatusModal = ({ open, onClose, type, title, message }) => {
    // Determine color and icon based on the 'type' prop
    const isSuccess = type === 'success';
    const themeColor = isSuccess ? 'success.main' : 'error.main';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Fade}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3, p: 2 }
            }}
        >
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    {/* Icon based on type */}
                    <Box sx={{ mb: 2 }}>
                        {isSuccess ? (
                            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: themeColor }} />
                        ) : (
                            <ErrorOutlineIcon sx={{ fontSize: 60, color: themeColor }} />
                        )}
                    </Box>

                    {/* Title Prop */}
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>

                    {/* Message Prop */}
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {message}
                    </Typography>

                    {/* Close Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onClose}
                        sx={{
                            bgcolor: themeColor,
                            '&:hover': { bgcolor: isSuccess ? 'success.dark' : 'error.dark' },
                            borderRadius: 2,
                            py: 1.5
                        }}
                    >
                        {isSuccess ? 'Great, Thank You!' : 'Close'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default StatusModal;