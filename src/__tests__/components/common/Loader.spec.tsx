import {render, screen} from '@testing-library/react';
import Loader from '../../../components/common/Loader';
import React from 'react';

describe('Loader Component', () => {
    it('should render the loader when open is true', () => {
        render(<Loader open={true}/>);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
});