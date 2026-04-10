'use client';

import { useState } from "react";
import { Product } from "@/types";
import { useProducts } from "../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card , CardContent , CardHeader , CardTitle , CardDescription} from "@/components/ui/card";

interface ProductFormProps {
    onSubmit: (product: Omit<Product, "id">) => void;
    initialValues?: Product;
    isEdit?: boolean;
}

export const ProductForm = ({
    onSubmit,
    initialValues,
    isEdit = false
}: ProductFormProps) => {
    const[formData,setFormData] = useState({
        name: initialValues?.name || "",
        price: initialValues?.price || 0,
        description: initialValues?.description || "",
        image: initialValues?.image || ""
     });
    
     const [error,setError] = useState<Record<string,string>>({})

     const validateForm = () : boolean => {
        const newErrors : Record<string,string> = {};

        if(!formData.name.trim()){
            newErrors.name = "Name is required";
        }
        if(!formData.price){
            newErrors.price = "Price is required";
        }
        if(!formData.description.trim()){
            newErrors.description = "Description is required";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
        if (error[name]) {
        setError(prev => ({
            ...prev,
            [name]: '',
        }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        onSubmit({
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image || undefined,
        });

        setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        });
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</CardTitle>
        <CardDescription>
          {isEdit ? 'Update product details' : 'Fill in the details to add a new product'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={error.name ? 'border-red-500' : ''}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              step="0.01"
              className={error.price ? 'border-red-500' : ''}
            />
            {error.price && <p className="text-red-500 text-sm">{error.price}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              className={error.description ? 'border-red-500' : ''}
            />
            {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>

          <Button type="submit" className="w-full">
            {isEdit ? 'Update Product' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );    

}
