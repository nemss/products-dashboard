import {PERMISSIONS} from "../constants/permisions.ts";

export const getPermissions = async (): Promise<string[]> => {
    return [PERMISSIONS.CREATE, PERMISSIONS.READ, PERMISSIONS.UPDATE, PERMISSIONS.DELETE];
};