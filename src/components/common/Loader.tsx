import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

interface LoaderProps {
    open: boolean;
}

const Loader: React.FC<LoaderProps> = ({open}) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: 10,
                opacity: 100
            }}
            open={open}
            data-testid='loader'
        >
            <CircularProgress color="inherit" data-testid="circular-progress"/>
        </Backdrop>
    );
};

export default Loader;