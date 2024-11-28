import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import CreateEditProductModal from "../../../components/products/CreateEditProductModal.tsx";
import {BUTTON_TEXTS} from '../../../constants/button';

const mockOnClose = vi.fn();
const mockOnSubmit = vi.fn();

describe('CreateEditProductModal', () => {
    const initialValues = {name: 'Test Product', price: 100, currency: 'USD'};

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the modal in create mode', async () => {
        render(
            <CreateEditProductModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        );

        expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Price')).toBeInTheDocument();
        expect(screen.getByLabelText('Currency')).toBeInTheDocument();
    });

    it('renders the modal in edit mode', () => {
        render(
            <CreateEditProductModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                initialValues={initialValues}
            />
        );

        expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
        expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
        expect(screen.getByText(BUTTON_TEXTS.SAVE_CHANGES)).toBeInTheDocument();
    });

    it('calls onSubmit with correct values', async () => {
        const user = userEvent.setup();

        render(
            <CreateEditProductModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        );

        await user.type(screen.getByLabelText('Product Name'), 'New Product');
        await user.clear(screen.getByLabelText('Price'));
        await user.type(screen.getByLabelText('Price'), '200');
        await user.type(screen.getByLabelText('Currency'), 'EUR');

        await user.click(screen.getByTestId('create-product-button'));

        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: 'New Product',
            price: 200,
            currency: 'EUR',
        });
    });

    it('calls onClose when cancel button is clicked', async () => {
        const user = userEvent.setup();

        render(
            <CreateEditProductModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        );

        await user.click(screen.getByText(BUTTON_TEXTS.CANCEL));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('displays validation errors for empty fields', async () => {
        const user = userEvent.setup();

        render(
            <CreateEditProductModal
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        );

        await user.click(screen.getByTestId('create-product-button'));

        expect(await screen.findByText('Product name is required')).toBeInTheDocument();
        expect(await screen.findByText('Price must be a positive number')).toBeInTheDocument();
        expect(await screen.findByText('Currency is required')).toBeInTheDocument();
    });
});