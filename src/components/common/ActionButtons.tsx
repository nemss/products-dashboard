import React from 'react';

import {Box, Button} from '@mui/material';
import {BUTTON_COLORS, BUTTON_TEXTS, ButtonColor} from "../../constants/button.ts";

interface FormActionButtonsProps {
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: ButtonColor;
}

const ActionButtons:
    React.FC<FormActionButtonsProps> = (
    {
        onConfirm,
        onCancel,
        confirmText = BUTTON_TEXTS.SAVE_CHANGES,
        cancelText = BUTTON_TEXTS.CANCEL,
        confirmColor = BUTTON_COLORS.PRIMARY,
    }) => {
    return (
        <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={onCancel}>
                {cancelText}
            </Button>
            <Button variant="contained" color={confirmColor} onClick={onConfirm}>
                {confirmText}
            </Button>
        </Box>
    );
};

export default ActionButtons;