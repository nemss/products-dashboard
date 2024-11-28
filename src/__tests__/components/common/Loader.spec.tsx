import React from 'react';
import {render, screen} from '@testing-library/react';
import Loader from '../../../components/common/Loader';
import {describe, expect, it} from 'vitest';

describe('Loader Component', () => {
    it('should render the loader when open is true', () => {
        render(<Loader open={true}/>);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should not render the loader when open is false', () => {
        render(<Loader open={false}/>);
        const loaderElement = screen.queryByTestId('loader');
        expect(loaderElement).not.toBeInTheDocument();
    });

    it('should render the loader and circular progress when open is true', () => {
        render(<Loader open={true}/>);
        const loaderElement = screen.getByTestId('loader');
        const progressElement = screen.getByTestId('circular-progress');

        expect(loaderElement).toBeInTheDocument();
        expect(progressElement).toBeInTheDocument();
    });

    it('should not render the loader or circular progress when open is false', () => {
        render(<Loader open={false}/>);
        const loaderElement = screen.queryByTestId('loader');
        const progressElement = screen.queryByTestId('circular-progress');

        expect(loaderElement).not.toBeInTheDocument();
        expect(progressElement).not.toBeInTheDocument();
    });
});