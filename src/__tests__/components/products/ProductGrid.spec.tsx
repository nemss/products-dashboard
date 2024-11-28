import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import ProductGrid from '../../../components/products/ProductGrid';
import {PERMISSIONS} from '../../../constants/permisions';
import {mockProducts} from '../../../__mocks__/mockData';

describe('ProductGrid Component', () => {
    const onEditMock = vi.fn();
    const onDeleteMock = vi.fn();

    const defaultProps = {
        products: mockProducts,
        permissions: [PERMISSIONS.UPDATE, PERMISSIONS.DELETE],
        onEdit: onEditMock,
        onDelete: onDeleteMock,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the grid with the correct columns', () => {
        render(<ProductGrid {...defaultProps} />);
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
        expect(screen.getByText('Currency')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('displays the correct number of rows', () => {
        render(<ProductGrid {...defaultProps} />);
        const rows = screen.getAllByRole('row');

        // +1 because the first row is the header
        expect(rows).toHaveLength(mockProducts.length + 1);
    });

    it('calls onEdit callback when the edit button is clicked', async () => {
        render(<ProductGrid {...defaultProps} />);

        const editButtons = screen.getAllByText('Edit');
        await userEvent.click(editButtons[0]);

        expect(onEditMock).toHaveBeenCalledWith(mockProducts[0]);
    });

    it('calls onDelete callback when the delete button is clicked', async () => {
        render(<ProductGrid {...defaultProps} />);

        const deleteButtons = screen.getAllByText('Delete');

        await userEvent.click(deleteButtons[1]);

        expect(onDeleteMock).toHaveBeenCalledWith(mockProducts[1]);
    });

    it('does not display action buttons if permissions are missing', () => {
        const propsWithoutPermissions = {...defaultProps, permissions: []};

        render(<ProductGrid {...propsWithoutPermissions} />);

        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });
});