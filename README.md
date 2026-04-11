# 🛍️ Product Management Dashboard

A full-stack product management application built with **Next.js**, **React**, **TypeScript**, and **shadcn/ui**. This app allows users to add, view, edit, and delete products with data persisting in browser localStorage.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Key Concepts](#key-concepts)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Core Features
- ✅ **Add Products** - Create new products with name, price, description, and image URL
- ✅ **View Products** - Display all products in an organized grid layout
- ✅ **Edit Products** - Update existing product details in a modal dialog
- ✅ **Delete Products** - Remove products with confirmation dialog
- ✅ **Search/Filter** - Search products by name or description
- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

### Bonus Features
- 🎁 **Form Validation** - Real-time validation with error messages
- 🎁 **Toast Notifications** - User feedback for all actions (add, update, delete)
- 🎁 **Sticky Add Form** - Form stays visible while scrolling products
- 🎁 **Data Persistence** - All products saved to browser localStorage

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **State Management** | React Hooks (useState, useEffect) |
| **Persistence** | Browser localStorage |
| **Notifications** | Sonner |

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Clone or Create Project

```bash
npx create-next-app@latest product-management --typescript --tailwind --app
cd product-management
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup shadcn/ui

```bash
npx shadcn@latest init
```

Install required components:
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dialog
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add alert
```

### Step 4: Install Sonner for Notifications

```bash
npm install sonner
```

### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
product-management/
├── app/
│   ├── layout.tsx           # Root layout with Toaster
│   ├── page.tsx            # Main page (all logic here)
│   └── globals.css         # Global styles
│
├── components/
│   ├── ProductForm.tsx      # Add/Edit product form
│   ├── ProductList.tsx      # Display all products grid
│   ├── ProductCard.tsx      # Individual product card
│   ├── EditProductModal.tsx # Edit modal wrapper
│   └── ui/                  # shadcn/ui components (auto-generated)
│
├── hooks/
│   └── useProducts.ts       # Custom hook for product state & logic
│
├── types/
│   └── index.ts            # TypeScript interfaces
│
├── utils/
│   └── localStorage.ts     # localStorage operations
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md               # This file!
```

---

## 🔄 How It Works

### Data Flow

```
User Action
    ↓
Component (ProductForm, ProductCard)
    ↓
Handler Function (handleAdd, handleUpdate, handleDelete)
    ↓
Hook Function (useProducts)
    ↓
localStorage Utils (addProduct, updateProduct, deleteProduct)
    ↓
Browser localStorage
    ↓
React State Updates
    ↓
Component Re-renders
    ↓
Toast Notification
```

### State Management with useProducts Hook

```typescript
const { products, isLoading, addProduct, updateProduct, deleteProduct } = useProducts();

// products: Array of all products
// isLoading: Loading state for initial data fetch
// addProduct: Function to add a new product
// updateProduct: Function to update an existing product
// deleteProduct: Function to delete a product
```

---

## 💡 Key Concepts

### 1. TypeScript Interfaces

**Product Interface**
```typescript
interface Product {
  id: string;              // Unique identifier (auto-generated)
  name: string;            // Product name
  price: number;           // Price in dollars
  description: string;     // Product description
  image?: string;          // Optional image URL
}
```

### 2. Omit Type Utility

```typescript
// When adding: Product WITHOUT id (system generates it)
Omit<Product, 'id'>

// When editing: Can update any field
Partial<Product>
```

### 3. Hydration & SSR

Next.js renders components on the server first, then client. The `isHydrated` state prevents mismatches:

```typescript
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);  // Mark hydration complete
  setProducts(getAllProducts());
}, []);

if (!isHydrated) {
  return { products: [], isLoading: true, ... };
}
```

### 4. Form Validation

Real-time validation with error display:

```typescript
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

## 📖 Usage Guide

### Adding a Product

1. Fill in the form on the left side:
   - Product Name
   - Price (in dollars)
   - Description
   - Image URL (optional)
2. Click **"Add Product"** button
3. Success toast appears
4. Product appears in the grid

### Editing a Product

1. Click **"Edit"** button on any product card
2. Modal dialog opens with form pre-filled
3. Make changes to any fields
4. Click **"Update Product"**
5. Modal closes and product updates
6. Success toast appears

### Deleting a Product

1. Click **"Delete"** button on any product card
2. Confirmation dialog appears
3. Click **OK** to confirm deletion
4. Product removed from list
5. Success toast appears

### Searching Products

1. Use the search box above the product grid
2. Type product name or description
3. Products filter in real-time
4. Clear search to see all products

---

## 🏗️ Architecture

### Three-Layer Architecture

```
┌─────────────────────────────────┐
│    Presentation Layer            │
│  (Components & UI)               │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│    State Management Layer        │
│  (useProducts Hook)              │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│    Persistence Layer             │
│  (localStorage Utils)            │
└─────────────────────────────────┘
```

### Design Patterns Used

1. **Custom Hooks** - Encapsulate state logic
2. **Component Composition** - Reusable UI components
3. **Separation of Concerns** - Each layer has single responsibility
4. **Props Drilling** - Pass data and callbacks to children
5. **Modal Pattern** - EditProductModal wraps ProductForm

---

## 🔧 Troubleshooting

### Issue: Hydration Mismatch Error

**Cause:** Server and client render differently

**Solution:** Ensure `isHydrated` state is used in hook

```typescript
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

if (!isHydrated) return { products: [], ... };
```

### Issue: localStorage is not defined

**Cause:** Accessing localStorage on server side

**Solution:** Use `typeof window !== 'undefined'` check

```typescript
if (typeof window === 'undefined') return [];
const data = localStorage.getItem('products');
```

### Issue: Products not persisting

**Cause:** Browser storage cleared or localStorage disabled

**Solution:** Check browser storage settings or dev tools

Open DevTools → Application → Local Storage → Check 'products' key

### Issue: Form not validating

**Cause:** Validation function not called on submit

**Solution:** Call `validateForm()` in `handleSubmit()`

```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;  // Validate first
  onSubmit(formData);
};
```

---

## 📚 Learning Resources

### Concepts Covered

- Next.js App Router & SSR
- React Hooks (useState, useEffect)
- TypeScript Interfaces & Generics
- Component Architecture
- State Management Patterns
- LocalStorage API
- Form Handling & Validation
- Responsive Design with Tailwind CSS
- Modal & Dialog Components

### Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🎯 Future Enhancements

- [ ] Add product categories/tags
- [ ] Implement sorting (by price, name, date)
- [ ] Export products as CSV/JSON
- [ ] Import products from CSV/JSON
- [ ] Add product ratings
- [ ] Implement dark mode
- [ ] Add product images upload (instead of URL)
- [ ] Sync with backend API
- [ ] Add user authentication
- [ ] Implement undo/redo functionality

---

## 📝 Notes

- Data is stored in browser localStorage, so it persists between sessions
- Clearing browser cache will delete all product data
- Maximum recommended products: 1000 (localStorage limit ~5MB)
- Form validation happens on client-side only 
- In production, always validate on server as well

---

## 👨‍💻 Developer

Built as a Full Stack Intern Assessment - Product Management application

**Technologies Used:**
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Sonner


