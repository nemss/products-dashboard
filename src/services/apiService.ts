const API_URL = '/products.json'; // Локалният JSON файл

export interface Product {
    id: number;
    name: string;
    price: number;
    currency: string;
}
