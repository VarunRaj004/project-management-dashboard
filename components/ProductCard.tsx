'use client';

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({product , onEdit , onDelete}: ProductCardProps) => {
    return(
        <Card className = "overflow-hidden">
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                />
            )}
            {!product.image && (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                </div>
            )}
        <CardHeader>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2">
            {product.description}
            </CardDescription>
        </CardHeader>  
              <CardContent>
                <div className="mb-4">
                <p className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                </p>
                </div>

                <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => onEdit(product)}
                    className="flex-1"
                >
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => {
                    if (confirm('Are you sure you want to delete this product?')) {
                        onDelete(product.id);
                    }
                    }}
                    className="flex-1"
                >
                    Delete
                </Button>
                </div>
            </CardContent>          
        </Card>
    );
}