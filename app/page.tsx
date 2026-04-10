'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ProductForm } from '@/components/ProductForm';
import { ProductList } from '@/components/ProductList';
import { EditProductModal } from '@/components/EditProductModal';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';

export default function Home() {
  const { products, isLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    try {
      addProduct(product);
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    try {
      updateProduct(id, updates);
      toast.success('Product updated successfully!');
      setEditingProduct(null);
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = (id: string) => {
    try {
      deleteProduct(id);
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Product Management
          </h1>
          <p className="text-muted-foreground">
            Add, view, edit, and delete your products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProductForm onSubmit={handleAddProduct} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <ProductList
              products={products}
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </div>

      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleUpdateProduct}
      />
    </div>
  );
}