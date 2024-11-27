export const generateAriaAttributes = (id: string): Record<string, string> => {
    return {
        'aria-labelledby': `${id}-title`,
        'aria-describedby': `${id}-description`,
    };
};