import React, {useEffect, useState} from 'react';

import ProductGrid from './components/ProductGrid';

import {Alert, Box, Button, CircularProgress, Snackbar, Typography} from '@mui/material';

import {IProduct} from './interfaces/product';

import {deleteProduct, getProducts, updateProduct} from './services/apiService';
import {getPermissions} from './services/permisionService';

import {PERMISSIONS} from './constants/permisions';
import {SNACKBAR_MESSAGES} from './constants/snackbarMessages';
import {BUTTON_TEXTS} from './constants/buttonText';

const SnackbarSeverity = {
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

type SnackbarSeverity = typeof SnackbarSeverity[keyof typeof SnackbarSeverity];


const App: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [permissions, setPermissions] = useState<string[]>([]);
    const [_, setIsCreateModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: SnackbarSeverity }>({
        open: false,
        message: '',
        severity: 'success',
    });

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

    const handleEdit = async (updatedProduct: IProduct) => {
        setIsLoading(true);
        try {
            const editedProduct = await updateProduct(updatedProduct);

            setProducts((prev) =>
                prev.map((product) => (product.id === editedProduct.id ? editedProduct : product))
            );

            showSnackbar(SNACKBAR_MESSAGES.PRODUCT_UPDATED, SnackbarSeverity.SUCCESS);
        } catch (error) {
            console.error(error);
            showSnackbar('Failed to update product', SnackbarSeverity.ERROR);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        setIsLoading(true);
        try {
            await deleteProduct(id);

            setProducts((prev) => prev.filter((product) => product.id !== id));

            showSnackbar(SNACKBAR_MESSAGES.PRODUCT_DELETED, SnackbarSeverity.SUCCESS);
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
                            <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
                                {BUTTON_TEXTS.CREATE}
                            </Button>
                        )}
                    </Box>

                    <ProductGrid
                        products={products}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        permissions={permissions}
                    />
                </Box>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
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