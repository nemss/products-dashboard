export const BUTTON_TEXTS = {
    CREATE: 'Create Product',
    EDIT: 'Edit',
    DELETE: 'Delete',
    SUBMIT: 'Submit',
    CANCEL: 'Cancel',
    SAVE_CHANGES: 'Save Changes',
    CONFIRM: 'Confirm'
};

export const BUTTON_COLORS = {
    PRIMARY: 'primary',
    ERROR: 'error',
    SUCCESS: 'success',
} as const;

export type ButtonColor = typeof BUTTON_COLORS[keyof typeof BUTTON_COLORS];