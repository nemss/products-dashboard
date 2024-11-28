# Products Dashboard

A React application to manage products with CRUD (Create, Read, Update, Delete) functionality using **React**, *
*TypeScript**, **MUI**, **React Hook Form**, **Yup**, and **AG Grid**.

## Features

- **Create Products:** Add a new product using a modal form with validation.
- **Read Products:** Display a list of products in a data grid with pagination.
- **Update Products:** Edit existing products using a modal form.
- **Delete Products:** Remove a product with confirmation.
- **Permission Control:** Show or hide actions (Create, Update, Delete) based on permissions.
- **Loading Indicators:** Visual feedback with a backdrop loader during operations.
- **Notifications:** Feedback using snackbars for all CRUD actions.

---

## Tech Stack

- **React**: UI development library.
- **TypeScript**: Ensures type safety.
- **Vite**: Blazing fast development build tool.
- **MUI**: Provides modern components and styling.
- **React Hook Form**: For form management.
- **Yup**: For form validation.
- **AG Grid**: High-performance grid for data display.
- **Vitest & React Testing Library**: Unit testing.

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:nemss/products-dashboard.git

2. **Navigate to the Project Directory:**

    ```bash
    cd products-dashboard

3. **Install Dependencies:**

    ```bash
    npm install

## Project Structure

```plaintext
src/
├── assets/              # Static assets like images, icons, etc.
├── components/          # Reusable React components
│   ├── common/          # General-purpose components
│   │   ├── ActionButtons.tsx         # Reusable action buttons
│   │   ├── Loader.tsx                # Backdrop loader component
│   │   ├── ConfirmationModal.tsx     # Universal confirmation modal
│   ├── products/       # Components specific to product management
│       ├── CreateEditProductModal.tsx  # Modal for adding/editing products
│       ├── GridActionButtons.tsx       # Grid-specific action buttons
│       ├── ProductGrid.tsx             # Data grid for displaying products
├── constants/           # Static values like texts, permissions, etc.
├── hooks/               # Custom React hooks (e.g., useSnackbar)
├── interfaces/          # TypeScript interfaces and types
├── services/            # API services for CRUD operations and permissions
├── styles/              # Custom styles for components
├── utils/               # Utility functions
└── App.tsx              # Main entry point of the app