import React from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import {modalStyle} from "../styles/modalStyles.ts";

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
    React.FC<ConfirmationModalProps> = (
    {
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
            <Box sx={modalStyle}>
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