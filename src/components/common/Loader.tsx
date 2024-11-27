import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

interface LoaderProps {
    open: boolean;
}

const Loader: React.FC<LoaderProps> = ({open}) => {
    return (
        <Backdrop
            sx={(theme) => ({
                color: '#fff',
                zIndex: theme.zIndex.drawer + 1,
            })}
            open={open}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default Loader;