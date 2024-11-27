import React, {useEffect, useState} from 'react';

import ProductGrid from './components/ProductGrid';

import {Alert, Box, Button, CircularProgress, Snackbar, Typography} from '@mui/material';

import {IProduct} from './interfaces/product';

import {deleteProduct, getProducts, updateProduct} from './services/apiService';
import {getPermissions} from './services/permisionService';

import {PERMISSIONS} from './constants/permisions';
import {SNACKBAR_MESSAGES} from './constants/snackbarMessages';
import {BUTTON_TEXTS} from './constants/buttonText';
import ConfirmationModal from "./components/ConfirmationModal.tsx";
import CreateEditProductModal from "./components/CreateEditProductModal.tsx";
import {API_ERROR_MESSAGES} from "./constants/apiErrorMessages.ts";

const SnackbarSeverity = {
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

type SnackbarSeverity = typeof SnackbarSeverity[keyof typeof SnackbarSeverity];


const App: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [permissions, setPermissions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: SnackbarSeverity }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);


    const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Omit<IProduct, 'id'> | null>(null);

    const showSnackbar = (message: string, severity: SnackbarSeverity) => {
        setSnackbar({open: true, message, severity});
    };

    const handleSnackbarClose = () => {
        setSnackbar({open: false, message: '', severity: SnackbarSeverity.SUCCESS});
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedPermissions = await getPermissions();
                setPermissions(fetchedPermissions);

                if (fetchedPermissions.includes(PERMISSIONS.READ)) {
                    const fetchedProducts = await getProducts();
                    setProducts(fetchedProducts);
                }

                showSnackbar(SNACKBAR_MESSAGES.PRODUCTS_LOADED, SnackbarSeverity.SUCCESS);
            } catch (error) {
                console.error(error);
                showSnackbar('Failed to load data', SnackbarSeverity.ERROR);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateProduct = async (product: Omit<IProduct, 'id'>) => {
        setIsLoading(true);
        try {
            const newProduct = {...product, id: Date.now()};

            setProducts((prev) => [...prev, newProduct]);

            showSnackbar(SNACKBAR_MESSAGES.PRODUCT_CREATED, SnackbarSeverity.SUCCESS);
        } catch (error) {
            console.error('Error creating product:', error);
            showSnackbar(API_ERROR_MESSAGES.ADD_PRODUCT, SnackbarSeverity.ERROR);
        } finally {
            setIsLoading(false);
            setIsCreateEditModalOpen(false);
        }
    };

    const handleEditProduct = async (product: IProduct) => {
        setIsLoading(true);
        try {
            if (productToEdit) {
                const updatedProduct = {...productToEdit, ...product};

                await updateProduct(updatedProduct);

                setProducts((prev) =>
                    prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
                );
                showSnackbar(SNACKBAR_MESSAGES.PRODUCT_UPDATED, SnackbarSeverity.SUCCESS);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            showSnackbar(SNACKBAR_MESSAGES.PRODUCT_UPDATED, SnackbarSeverity.ERROR);
        } finally {
            setIsLoading(false);
            setIsCreateEditModalOpen(false);
            setProductToEdit(null);
        }
    };

    const handleDeleteClick = (product: IProduct) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        try {
            console.log('Selected product', selectedProduct)
            if (selectedProduct) {
                await deleteProduct(selectedProduct.id);

                setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id));

                showSnackbar(SNACKBAR_MESSAGES.PRODUCT_DELETED, SnackbarSeverity.SUCCESS)
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            showSnackbar('Failed to delete product', SnackbarSeverity.ERROR);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box padding="1rem">
            <Typography variant="h3">Products Dashboard</Typography>

            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <CircularProgress/>
                </Box>
            )}

            {!isLoading && (
                <Box>
                    <Box textAlign="right" mb={2}>
                        {permissions.includes(PERMISSIONS.CREATE) && (
                            <Button variant="contained" onClick={() => {
                                setProductToEdit(null);
                                setIsCreateEditModalOpen(true);
                            }}>
                                {BUTTON_TEXTS.CREATE}
                            </Button>
                        )}
                    </Box>

                    <ProductGrid
                        products={products}
                        onDelete={handleDeleteClick}
                        onEdit={(product) => {
                            setProductToEdit(product);
                            setIsCreateEditModalOpen(true);
                        }}
                        permissions={permissions}
                    />
                </Box>
            )}

            <CreateEditProductModal
                open={isCreateEditModalOpen}
                onClose={() => setIsCreateEditModalOpen(false)}
                onSubmit={productToEdit ? handleEditProduct : handleCreateProduct}
                initialValues={productToEdit || undefined}
            />

            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
                confirmButtonColor="error"
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={2500}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default App;