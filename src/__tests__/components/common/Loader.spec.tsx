import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Loader from '../../../components/common/Loader';

describe('Loader Component', () => {
    it('should render the loader and be visible when open is true', () => {
        render(<Loader open={true}/>);
        const loader = screen.getByTestId('loader');
        const circularProgress = screen.getByTestId('circular-progress');

        expect(loader).toBeInTheDocument();
        expect(loader).toHaveStyle('visibility: visible');
        expect(circularProgress).toBeInTheDocument();
    });

    it('should not render the loader when open is false', () => {
        render(<Loader open={false}/>);
        const loader = screen.queryByTestId('loader');
        const circularProgress = screen.getByTestId('circular-progress');

        expect(loader).toBeInTheDocument();
        expect(loader).toHaveStyle('visibility: hidden');
        expect(circularProgress).toBeInTheDocument();
    });
});