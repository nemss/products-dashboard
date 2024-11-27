import {useState} from 'react';

export const SnackbarSeverity = {
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

export type SnackbarSeverity = typeof SnackbarSeverity[keyof typeof SnackbarSeverity];

interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: SnackbarSeverity.SUCCESS,
    });

    const showSnackbar = (message: string, severity: SnackbarSeverity) => {
        setSnackbar({open: true, message, severity});
    };

    const closeSnackbar = () => {
        setSnackbar({...snackbar, open: false});
    };

    return {snackbar, showSnackbar, closeSnackbar};
};

export default useSnackbar;