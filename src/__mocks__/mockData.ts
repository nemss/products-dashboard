import {IProduct} from "../interfaces/product.ts";

export const productMock: IProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    currency: 'USD',
};

export const mockProducts: IProduct[] = [
    {id: 1, name: 'Product 1', price: 100, currency: 'USD'},
    {id: 2, name: 'Product 2', price: 200, currency: 'EUR'},
];
