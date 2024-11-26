export const getPermissions = async (): Promise<string[]> => {
    return ['CREATE', 'READ', 'UPDATE', 'DELETE'];
};