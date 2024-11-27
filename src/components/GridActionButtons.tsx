import React from 'react';

import {Box, Button} from '@mui/material';

import {BUTTON_TEXTS} from '../constants/button';
import {PERMISSIONS} from '../constants/permisions';

import {CustomCellRendererProps} from 'ag-grid-react';
import {IProduct} from '../interfaces/product.ts';

interface ActionButtonsProps extends CustomCellRendererProps {
    permissions: string[];
    onEdit: (data: IProduct) => void;
    onDelete: (data: IProduct) => void;
}

const GridActionButtons: React.FC<ActionButtonsProps> = ({permissions, onEdit, onDelete, data}) => {
    return (
        <Box style={{display: 'flex', gap: '0.5rem', height: '100%', padding: '0.125rem'}}>
            {permissions.includes(PERMISSIONS.UPDATE) && (
                <Button variant="contained" color="primary" size="small" onClick={() => onEdit(data)}>
                    {BUTTON_TEXTS.EDIT}
                </Button>
            )}
            {permissions.includes(PERMISSIONS.DELETE) && (
                <Button variant="contained" color="error" size="small" onClick={() => onDelete(data)}>
                    {BUTTON_TEXTS.DELETE}
                </Button>
            )}
        </Box>
    );
};

export default GridActionButtons;