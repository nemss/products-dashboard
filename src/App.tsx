import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Snackbar, Typography} from '@mui/material';

import ProductGrid from './components/products/ProductGrid.tsx';
import ConfirmationModal from './components/common/ConfirmationModal.tsx';
import CreateEditProductModal from './components/products/CreateEditProductModal.tsx';

import {IProduct, ProductInput} from './interfaces/product';
import {addProduct, deleteProduct, getProducts, updateProduct} from './services/apiService';
import {getPermissions} from './services/permisionService';

import {PERMISSIONS} from './constants/permisions';
import {SNACKBAR_MESSAGES} from './constants/snackbarMessages';
import {BUTTON_TEXTS} from './constants/button';
import {API_ERROR_MESSAGES} from './constants/apiErrorMessages';

import useSnackbar, {SnackbarSeverity} from './hooks/useSnackbar';
import Loader from "./components/common/Loader.tsx";

const App: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [permissions, setPermissions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Omit<IProduct, 'id'> | null>(null);

    const {snackbar, showSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedPermissions = await getPermissions();
                setPermissions(fetchedPermissions);

                if (fetchedPermissions.includes(PERMISSIONS.READ)) {
                    const response = await getProducts();

                    if (response.ok) {
                        setProducts(response.data as IProduct[]);
                        showSnackbar(SNACKBAR_MESSAGES.PRODUCTS_LOADED, SnackbarSeverity.SUCCESS);
                    }
                }
            } catch (error) {
                console.error(error);
                showSnackbar(API_ERROR_MESSAGES.FETCH_PRODUCTS, SnackbarSeverity.ERROR);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const openCreateModal = () => {
        setProductToEdit(null);
        setIsCreateEditModalOpen(true);
    };

    const handleCreateProduct = async (product: Omit<IProduct, 'id'>) => {
        setIsLoading(true);
        try {
            const newProduct = {...product, id: Date.now()};

            const response = await addProduct(newProduct)

            if (response.ok) {
                setProducts((prev) => [...prev, response.data as IProduct]);
                showSnackbar(SNACKBAR_MESSAGES.PRODUCT_CREATED, SnackbarSeverity.SUCCESS);
            }
        } catch (error) {
            console.error(error);
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

                const response = await updateProduct(updatedProduct);

                if (response.ok) {
                    setProducts((prev) =>
                        prev.map((p) => (p.id === response.data?.id ? updatedProduct : p))
                    );
                    showSnackbar(SNACKBAR_MESSAGES.PRODUCT_UPDATED, SnackbarSeverity.SUCCESS);
                }
            }
        } catch (error) {
            console.error(error);
            showSnackbar(API_ERROR_MESSAGES.UPDATE_PRODUCT, SnackbarSeverity.ERROR);
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
            if (selectedProduct) {
                const response = await deleteProduct(selectedProduct.id);

                if (response.ok) {
                    setProducts((prev) =>
                        prev.filter((product) => product.id !== selectedProduct.id)
                    );
                    showSnackbar(SNACKBAR_MESSAGES.PRODUCT_DELETED, SnackbarSeverity.SUCCESS);
                } else {
                    showSnackbar(API_ERROR_MESSAGES.DELETE_PRODUCT, SnackbarSeverity.ERROR);
                }
            }
        } catch (error) {
            console.error(error);
            showSnackbar(API_ERROR_MESSAGES.DELETE_PRODUCT, SnackbarSeverity.ERROR);
        } finally {
            setIsLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    const handleSubmit = async (product: ProductInput): Promise<void> => {
        if ('id' in product) {
            await handleEditProduct(product as IProduct);
        } else {
            await handleCreateProduct(product as Omit<IProduct, 'id'>);
        }
    };


    const closeCreateEditModal = () => setIsCreateEditModalOpen(false);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleEditClick = (product: IProduct) => {
        setProductToEdit(product);
        setIsCreateEditModalOpen(true);
    };

    return (
        <>
            <Loader open={isLoading}/>
            <Box padding="1rem">
                <Typography variant="h3">Products</Typography>

                <Box>
                    <Box textAlign="right" mb={2}>
                        {permissions.includes(PERMISSIONS.CREATE) && (
                            <Button variant="contained" onClick={openCreateModal}
                                    data-testid="create-new-product-button">
                                {BUTTON_TEXTS.CREATE}
                            </Button>
                        )}
                    </Box>

                    <ProductGrid
                        products={products}
                        onDelete={handleDeleteClick}
                        onEdit={handleEditClick}
                        permissions={permissions}
                    />
                </Box>

                <CreateEditProductModal
                    open={isCreateEditModalOpen}
                    onClose={closeCreateEditModal}
                    onSubmit={handleSubmit}
                    initialValues={productToEdit || undefined}
                />

                <ConfirmationModal
                    open={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onConfirm={handleConfirmDelete}
                    title="Confirm Deletion"
                    description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
                    confirmButtonColor="error"
                />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={2500}
                    onClose={closeSnackbar}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <Alert
                        onClose={closeSnackbar}
                        severity={snackbar.severity}
                        sx={{width: '100%'}}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default App;