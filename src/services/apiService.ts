import {IProduct} from "../interfaces/product.ts";
import {API_PATHS} from "../constants/apiPaths.ts";
import {API_ERROR_MESSAGES} from "../constants/apiErrorMessages.ts";

let productsCache: IProduct[] = [];

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        if (productsCache.length === 0) {
            const response = await fetch(API_PATHS.PRODUCTS);

            if (!response.ok) {
                throw new Error(API_ERROR_MESSAGES.FETCH_PRODUCTS);
            }

            const data = await response.json();
            productsCache = data.products || [];
        }
        return [...productsCache];
    } catch (error) {
        console.error(error);
        throw new Error(API_ERROR_MESSAGES.FETCH_PRODUCTS);
    }
};

export const addProduct = async (product: IProduct): Promise<IProduct> => {
    try {
        const newProduct: IProduct = {...product, id: Date.now()};

        productsCache.push(newProduct);
        await new Promise((resolve) => setTimeout(resolve, 500));

        return newProduct;
    } catch (error) {
        console.error(error);
        throw new Error(API_ERROR_MESSAGES.ADD_PRODUCT);
    }
};

export const updateProduct = async (updatedProduct: IProduct): Promise<IProduct> => {
    try {
        const index = productsCache.findIndex((product) => product.id === updatedProduct.id);

        if (index === -1) {
            throw new Error(API_ERROR_MESSAGES.PRODUCT_NOT_FOUND);
        }

        productsCache[index] = updatedProduct;
        await new Promise((resolve) => setTimeout(resolve, 500));

        return updatedProduct;
    } catch (error) {
        console.error(error);
        throw new Error(API_ERROR_MESSAGES.UPDATE_PRODUCT);
    }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        const index = productsCache.findIndex((product) => product.id === id);

        if (index === -1) {
            throw new Error(API_ERROR_MESSAGES.PRODUCT_NOT_FOUND);
        }

        productsCache.splice(index, 1);

        await new Promise((resolve) => setTimeout(resolve, 500));

        return true
    } catch (error) {
        console.error(error);
        throw new Error(API_ERROR_MESSAGES.DELETE_PRODUCT);
    }
};
