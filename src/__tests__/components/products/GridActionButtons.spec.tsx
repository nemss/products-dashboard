import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {BUTTON_TEXTS} from '../../../constants/button';
import {PERMISSIONS} from '../../../constants/permisions';
import {productMock} from '../../../__mocks__/mockData';
import GridActionButtons from "../../../components/products/GridActionButtons.tsx";

describe('GridActionButtons Component', () => {
    const onEditMock = vi.fn();
    const onDeleteMock = vi.fn();

    const defaultProps = {
        permissions: [PERMISSIONS.UPDATE, PERMISSIONS.DELETE],
        onEdit: onEditMock,
        onDelete: onDeleteMock,
        data: productMock,
    };

    it('should render both edit and delete buttons if permissions allow', () => {
        render(<GridActionButtons {...defaultProps} />);

        const editButton = screen.getByRole('button', {name: BUTTON_TEXTS.EDIT});
        const deleteButton = screen.getByRole('button', {name: BUTTON_TEXTS.DELETE});

        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it('should call onEdit with the correct data when the edit button is clicked', async () => {
        const user = userEvent.setup();
        render(<GridActionButtons {...defaultProps} />);

        const editButton = screen.getByRole('button', {name: BUTTON_TEXTS.EDIT});
        await user.click(editButton);

        expect(onEditMock).toHaveBeenCalledTimes(1);
        expect(onEditMock).toHaveBeenCalledWith(productMock);
    });

    it('should call onDelete with the correct data when the delete button is clicked', async () => {
        const user = userEvent.setup();
        render(<GridActionButtons {...defaultProps} />);

        const deleteButton = screen.getByRole('button', {name: BUTTON_TEXTS.DELETE});
        await user.click(deleteButton);

        expect(onDeleteMock).toHaveBeenCalledTimes(1);
        expect(onDeleteMock).toHaveBeenCalledWith(productMock);
    });

    it('should only render the edit button if only UPDATE permission is provided', () => {
        render(
            <GridActionButtons
                {...defaultProps}
                permissions={[PERMISSIONS.UPDATE]}
            />
        );

        const editButton = screen.getByRole('button', {name: BUTTON_TEXTS.EDIT});
        expect(editButton).toBeInTheDocument();

        const deleteButton = screen.queryByRole('button', {name: BUTTON_TEXTS.DELETE});
        expect(deleteButton).not.toBeInTheDocument();
    });

    it('should only render the delete button if only DELETE permission is provided', () => {
        render(
            <GridActionButtons
                {...defaultProps}
                permissions={[PERMISSIONS.DELETE]}
            />
        );

        const deleteButton = screen.getByRole('button', {name: BUTTON_TEXTS.DELETE});
        expect(deleteButton).toBeInTheDocument();

        const editButton = screen.queryByRole('button', {name: BUTTON_TEXTS.EDIT});
        expect(editButton).not.toBeInTheDocument();
    });

    it('should render neither button if no permissions are provided', () => {
        render(
            <GridActionButtons
                {...defaultProps}
                permissions={[]}
            />
        );

        const editButton = screen.queryByRole('button', {name: BUTTON_TEXTS.EDIT});
        const deleteButton = screen.queryByRole('button', {name: BUTTON_TEXTS.DELETE});

        expect(editButton).not.toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();
    });
});