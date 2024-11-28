import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import ActionButtons from '../../../components/common/ActionButtons.tsx';
import {BUTTON_TEXTS} from '../../../constants/button.ts';

describe('ActionButtons Component', () => {
    const onConfirmMock = vi.fn();
    const onCancelMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render both confirm and cancel buttons', () => {
        render(
            <ActionButtons
                onConfirm={onConfirmMock}
                onCancel={onCancelMock}
            />
        );

        const confirmButton = screen.getByRole('button', {name: BUTTON_TEXTS.SAVE_CHANGES});
        const cancelButton = screen.getByRole('button', {name: BUTTON_TEXTS.CANCEL});

        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('should call onConfirm when the confirm button is clicked', async () => {
        const user = userEvent.setup();

        render(
            <ActionButtons
                onConfirm={onConfirmMock}
                onCancel={onCancelMock}
            />
        );

        const confirmButton = screen.getByRole('button', {name: BUTTON_TEXTS.SAVE_CHANGES});
        await user.click(confirmButton);

        expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });

    it('should call onCancel when the cancel button is clicked', async () => {
        const user = userEvent.setup();

        render(
            <ActionButtons
                onConfirm={onConfirmMock}
                onCancel={onCancelMock}
            />
        );

        const cancelButton = screen.getByRole('button', {name: BUTTON_TEXTS.CANCEL});
        await user.click(cancelButton);

        expect(onCancelMock).toHaveBeenCalledTimes(1);
    });

    it('should render the correct confirm button text if provided', () => {
        const customConfirmText = 'Submit';

        render(
            <ActionButtons
                onConfirm={onConfirmMock}
                onCancel={onCancelMock}
                confirmText={customConfirmText}
            />
        );

        const confirmButton = screen.getByRole('button', {name: customConfirmText});
        expect(confirmButton).toBeInTheDocument();
    });

    it('should render the correct confirm button text if provided', () => {
        const customConfirmText = 'Submit';

        render(
            <ActionButtons
                onConfirm={onConfirmMock}
                onCancel={onCancelMock}
                confirmText={customConfirmText}
            />
        );

        const confirmButton = screen.getByRole('button', {name: customConfirmText});
        expect(confirmButton).toBeInTheDocument();
    });

    it('should render the correct cancel button text if provided', () => {
        const customCancelText = 'Back';

        render(
            <ActionButtons
                onConfirm={onConfirmMock}
                onCancel={onCancelMock}
                cancelText={customCancelText}
            />
        );

        const cancelButton = screen.getByRole('button', {name: customCancelText});
        expect(cancelButton).toBeInTheDocument();
    });
})