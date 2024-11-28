export interface IProduct {
    id: number;
    name: string;
    price: number;
    currency: string;
}

export type ProductInput = Omit<IProduct, 'id'> | IProduct;