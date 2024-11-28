import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

interface LoaderProps {
    open: boolean;
}

const Loader: React.FC<LoaderProps> = ({open}) => {
    return (
        <>
            {open && (<Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
                data-testid='loader'
            >
                <CircularProgress color="inherit" data-testid="circular-progress"/>
            </Backdrop>)}
        </>
    );
};

export default Loader;