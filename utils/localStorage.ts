import {Product } from '../types';

const STORAGE_KEY = 'products';

export const getAllProducts = (): Product[] => {
    if(typeof window === "undefined") return [] ;

    const products = localStorage.getItem(STORAGE_KEY);
    return products ? JSON.parse(products) : [];
}


export const saveProducts = (products : Product[]) => {
    if(typeof window === "undefined") return ;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export const addProduct = (product : Omit<Product,"id">)  => {
    if(typeof window === "undefined") return ;
    const products = getAllProducts();
    const newProduct = [...products , { ...product, id: Date.now().toString() }]
    saveProducts(newProduct);    
}

export const updateProduct = (id: string,updates: Partial<Product>) : void => {
    if(typeof window === "undefined") return ;
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if(index !== -1){
        products[index] = { ...products[index], ...updates };
        saveProducts(products);
    }
}

export const deleteProduct = (id : string) => {
    const products = getAllProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    saveProducts(filteredProducts);
}