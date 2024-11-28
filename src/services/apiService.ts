import {IProduct} from "../interfaces/product.ts";
import {API_PATHS} from "../constants/apiPaths.ts";
import {API_ERROR_MESSAGES} from "../constants/apiErrorMessages.ts";

let productsCache: IProduct[] = [];

const simulateDelay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

const handleApiError = (errorMessage: string, error?: any): ApiResponse<null> => {
    console.error(errorMessage, error);
    return {ok: false, status: 500, error, data: null};
};

type ApiResponse<T> = {
    ok: boolean;
    status: number;
    data?: T | null;
    error?: unknown;
};

export const getProducts = async (): Promise<ApiResponse<IProduct[] | null>> => {
    try {
        if (productsCache.length === 0) {
            const response = await fetch(API_PATHS.PRODUCTS);

            if (!response.ok) {
                return {ok: false, status: response.status};
            }

            const data = await response.json();
            productsCache = data.products || [];
        }

        return {ok: true, status: 200, data: [...productsCache]};
    } catch (error) {
        return handleApiError(API_ERROR_MESSAGES.FETCH_PRODUCTS, error);
    }
};

export const addProduct = async (
    product: Omit<IProduct, "id">
): Promise<ApiResponse<IProduct | null>> => {
    try {
        const newProduct: IProduct = {...product, id: Date.now()};
        productsCache.push(newProduct);

        await simulateDelay(500);

        return {ok: true, status: 201, data: newProduct};
    } catch (error) {
        return handleApiError(API_ERROR_MESSAGES.ADD_PRODUCT, error);
    }
};

export const updateProduct = async (
    updatedProduct: IProduct
): Promise<ApiResponse<IProduct | null>> => {
    try {
        const index = productsCache.findIndex(
            (product) => product.id === updatedProduct.id
        );

        if (index === -1) {
            return {ok: false, status: 404};
        }

        productsCache[index] = updatedProduct;

        await simulateDelay(500);

        return {ok: true, status: 200, data: updatedProduct};
    } catch (error) {
        return handleApiError(API_ERROR_MESSAGES.UPDATE_PRODUCT, error);
    }
};

export const deleteProduct = async (id: number): Promise<ApiResponse<null>> => {
    try {
        const index = productsCache.findIndex((product) => product.id === id);

        if (index === -1) {
            return {ok: false, status: 404};
        }

        productsCache.splice(index, 1);

        await simulateDelay(500);

        return {ok: true, status: 204};
    } catch (error) {
        return handleApiError(API_ERROR_MESSAGES.DELETE_PRODUCT, error);
    }
};