import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import {BUTTON_COLORS, BUTTON_TEXTS} from '../../../constants/button';

describe('ConfirmationModal Component', () => {
    const onConfirmMock = vi.fn();
    const onCloseMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const defaultProps = {
        open: true,
        onClose: onCloseMock,
        onConfirm: onConfirmMock,
        title: 'Test Modal',
        description: 'This is a test description.',
    };

    it('should render the modal with title and description', () => {
        render(<ConfirmationModal {...defaultProps} />);

        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it('should render confirm and cancel buttons with default texts', () => {
        render(<ConfirmationModal {...defaultProps} />);

        expect(screen.getByRole('button', {name: BUTTON_TEXTS.CONFIRM})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: BUTTON_TEXTS.CANCEL})).toBeInTheDocument();
    });

    it('should render confirm and cancel buttons with custom texts', () => {
        const customConfirmText = 'Yes';
        const customCancelText = 'No';

        render(
            <ConfirmationModal
                {...defaultProps}
                confirmText={customConfirmText}
                cancelText={customCancelText}
            />
        );

        expect(screen.getByRole('button', {name: customConfirmText})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: customCancelText})).toBeInTheDocument();
    });

    it('should call onConfirm when the confirm button is clicked', async () => {
        const user = userEvent.setup();
        render(<ConfirmationModal {...defaultProps} />);

        const confirmButton = screen.getByRole('button', {name: BUTTON_TEXTS.CONFIRM});
        await user.click(confirmButton);

        expect(onConfirmMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when the cancel button is clicked', async () => {
        const user = userEvent.setup();
        render(<ConfirmationModal {...defaultProps} />);

        const cancelButton = screen.getByRole('button', {name: BUTTON_TEXTS.CANCEL});
        await user.click(cancelButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should apply the correct color to the confirm button', () => {
        render(
            <ConfirmationModal {...defaultProps} confirmButtonColor={BUTTON_COLORS.ERROR}/>
        );

        const confirmButton = screen.getByRole('button', {name: BUTTON_TEXTS.CONFIRM});
        expect(confirmButton).toHaveClass('MuiButton-containedError');
    });

    it('should not render anything when the modal is closed', () => {
        render(<ConfirmationModal {...defaultProps} open={false}/>);

        expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
        expect(screen.queryByText(defaultProps.description)).not.toBeInTheDocument();
    });
});