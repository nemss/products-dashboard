import React from 'react';
import {Box, Button} from '@mui/material';
import {BUTTON_TEXTS} from "../constants/buttonText.ts";
import {PERMISSIONS} from "../constants/permisions.ts";

interface ActionButtonsProps {
    permissions: string[];
    onEdit: () => void;
    onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ permissions, onEdit, onDelete }) => {
    return (
        <Box style={{ display: 'flex', gap: '0.5rem', height: '100%', padding: '0.125rem' }}>
            {permissions.includes(PERMISSIONS.UPDATE) && (
                <Button variant="contained" color="primary" size="small" onClick={onEdit}>
                    {BUTTON_TEXTS.EDIT}
                </Button>
            )}
            {permissions.includes(PERMISSIONS.DELETE) && (
                <Button variant="contained" color="error" size="small" onClick={onDelete}>
                    {BUTTON_TEXTS.DELETE}
                </Button>
            )}
        </Box>
    );
};

export default ActionButtons;