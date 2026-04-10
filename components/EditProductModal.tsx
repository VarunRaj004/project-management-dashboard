'use client';

import { Product } from '@/types';
import { ProductForm } from './ProductForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSubmit: (id: string, updates: Partial<Product>) => void;
}

export const EditProductModal = ({ 
  product, 
  onClose, 
  onSubmit 
}: EditProductModalProps) => {
  if (!product) return null;

  const handleSubmit = (formData: Omit<Product, 'id'>) => {
    onSubmit(product.id, formData);
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product details below
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
};