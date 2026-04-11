'use client';
import { useState , useEffect } from "react";
import { Product } from '@/types';
import { 
  getAllProducts, 
  addProduct as addProductUtil, 
  updateProduct as updateProductUtil, 
  deleteProduct as deleteProductUtil 
} from '@/utils/localStorage';

export const useProducts = () => {
    const [products,setProducts] = useState<Product []>([]);
    const [isLoading,setisLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false); 

    useEffect(() => {
        setIsHydrated(true);
        setProducts(getAllProducts());
        setisLoading(false);
    }, []);

   const addProduct = (product: Omit<Product , 'id'>) => {
    addProductUtil(product);
    setProducts(getAllProducts());
   }

   const updateProduct = (id:string , updates: Partial<Product>) => {
    updateProductUtil(id, updates);
    setProducts(getAllProducts());
   }

    const deleteProduct = (id: string) => {
        deleteProductUtil(id);
        setProducts(getAllProducts());
    }

    if (!isHydrated) {
        return {
        products: [],
        isLoading: true,
        addProduct: () => {},
        updateProduct: () => {},
        deleteProduct: () => {}
        };
    }

    return {
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct
    };
}
