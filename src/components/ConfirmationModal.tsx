import React from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    confirmButtonColor?: 'primary' | 'error';
}

const ConfirmationModal:
    React.FC<ConfirmationModalProps> = ({
                                            open,
                                            onClose,
                                            onConfirm,
                                            title,
                                            description,
                                            confirmText = 'Confirm',
                                            cancelText = 'Cancel',
                                            confirmButtonColor = 'primary',
                                        }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="confirmation-modal-title" variant="h6" component="h2" mb={2}>
                    {title}
                </Typography>
                <Typography id="confirmation-modal-description" variant="body1" mb={4}>
                    {description}
                </Typography>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button variant="contained" color={confirmButtonColor} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;