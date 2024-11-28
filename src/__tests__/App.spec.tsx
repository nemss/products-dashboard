import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import App from '../App';
import {PERMISSIONS} from '../constants/permisions';
import * as apiService from '../services/apiService';
import * as permissionService from '../services/permisionService';

vi.mock('../services/apiService');
vi.mock('../services/permisionService');

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(permissionService.getPermissions).mockResolvedValue([PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE]);
        vi.mocked(apiService.getProducts).mockResolvedValue({
            ok: true,
            status: 200,
            data: [
                {id: 1, name: 'Product 1', price: 100, currency: 'USD'},
                {id: 2, name: 'Product 2', price: 200, currency: 'EUR'},
            ],
        });
    });

    it('renders the App with products and permissions', async () => {
        render(<App/>);

        expect(screen.getByText('Products')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        expect(screen.getByTestId('create-new-product-button')).toBeInTheDocument();
    });

    it('opens Create Product modal', async () => {
        render(<App/>);

        await waitFor(() => {
            expect(screen.getByTestId('create-new-product-button')).toBeInTheDocument();
        });

        await userEvent.click(screen.getByTestId('create-new-product-button'));

        expect(screen.getByTestId('create-edit-modal-title')).toBeInTheDocument();
    });
});