import React from 'react';

import {Box, Modal, Typography} from '@mui/material';

import {modalStyle} from '../styles/modalStyles';
import {generateAriaAttributes} from '../utils/generateAriaAttributes';

import ActionButtons from './ActionButtons';
import {BUTTON_COLORS, BUTTON_TEXTS, ButtonColor} from "../constants/button.ts";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    confirmButtonColor?: ButtonColor;
}

const ConfirmationModal:
    React.FC<ConfirmationModalProps> = (
    {
        open,
        onClose,
        onConfirm,
        title,
        description,
        confirmText = BUTTON_TEXTS.CONFIRM,
        cancelText = BUTTON_TEXTS.CANCEL,
        confirmButtonColor = BUTTON_COLORS.PRIMARY,
    }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            {...generateAriaAttributes('confirmation-modal')}
        >
            <Box sx={modalStyle}>
                <Typography id="confirmation-modal-title" variant="h6" component="h2" mb={2}>
                    {title}
                </Typography>
                <Typography id="confirmation-modal-description" variant="body1" mb={4}>
                    {description}
                </Typography>
                <ActionButtons
                    onConfirm={onConfirm}
                    onCancel={onClose}
                    confirmText={confirmText}
                    cancelText={cancelText}
                    confirmColor={confirmButtonColor}
                />
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;