import {act, renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import useSnackbar, {SnackbarSeverity} from '../../hooks/useSnackbar';

describe('useSnackbar Hook', () => {
    it('should initialize with default state', () => {
        const {result} = renderHook(() => useSnackbar());

        expect(result.current.snackbar).toEqual({
            open: false,
            message: '',
            severity: SnackbarSeverity.SUCCESS,
        });
    });

    it('should update snackbar state when showSnackbar is called', () => {
        const {result} = renderHook(() => useSnackbar());

        act(() => {
            result.current.showSnackbar('Test message', SnackbarSeverity.ERROR);
        });

        expect(result.current.snackbar).toEqual({
            open: true,
            message: 'Test message',
            severity: SnackbarSeverity.ERROR,
        });
    });

    it('should close the snackbar when closeSnackbar is called', () => {
        const {result} = renderHook(() => useSnackbar());

        act(() => {
            result.current.showSnackbar('Another message', SnackbarSeverity.SUCCESS);
        });

        expect(result.current.snackbar.open).toBe(true);

        act(() => {
            result.current.closeSnackbar();
        });

        expect(result.current.snackbar.open).toBe(false);
    });
});